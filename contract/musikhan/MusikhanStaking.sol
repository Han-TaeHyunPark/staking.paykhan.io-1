// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

import "./IMusikhan.sol";
import "./Musikhan.sol";

contract MusikhanStaking is ReentrancyGuard, Ownable, Pausable {
    IERC20 private rewardToken;  // Hanchain
    Musikhan private musikhan;

    constructor(address _rewardToken, address _musikhan) onlyOwner {
        rewardToken = IERC20(_rewardToken);
        musikhan = Musikhan(_musikhan);
    }

    uint public constant hanTokenPerLpToken = 2314814815; // 0.000000002314814815
    uint public  tokenQuota = 5000000 ether; // 365000000000000000000000 컨트랙랙트에 입금
    uint public  rewardsDuration = 365 days;

    bool private check;
    bool private checkL2;
    bool private checkMint;
    uint public totalSupply;

    struct Staker {
        string name;
        string symbol;
        address l2Ca;
        uint amountStaked; // 스테이킹한 금액
        uint claimedReward;    // 지금까지 받은 보상
        uint timeOfLastUpdate;  // 마지막으로 스테이킹한 시간
        uint unclaimedRewards;  // 클레임 받지 않고 쌓인 보상
    }
    mapping(address => mapping(address => Staker)) private stakers;
    mapping(address => uint) public totalReward; // 지금까지 받은 총 보상
    mapping(address => address[]) private stakingTokenList; // 스테이킹 한 토큰 리스트
    mapping(address => address[]) private claimTokenList;   // 클레임 받을 수 있는 토큰 리스트

    mapping(address => address[]) private stakerAddress; // 토큰 주소 => 지갑 주소 배열열
    mapping(address => mapping(address => uint)) private stakerAmount; // 토큰 주소 => 내 지갑 주소 => 금액


    // Staking pause
    function pause() public onlyOwner {
        _pause();
    }
    function unpause() public onlyOwner {
        _unpause();
    }

    // Reward Token Transfer Function of Contract
    function transferRewardToken(uint _amount) public onlyOwner {
        rewardToken.transfer(msg.sender , _amount);
    }

    function recoverERC20(address _tokenAddress, uint256 _tokenAmount) external onlyOwner {
        IERC20(_tokenAddress).transfer(msg.sender, _tokenAmount);
        emit RecoveredERC20(_tokenAddress, _tokenAmount);
    }

    function recoverERC721(address _tokenAddress, uint256 _tokenId) external onlyOwner {
        IERC721(_tokenAddress).safeTransferFrom(address(this), msg.sender, _tokenId);
        emit RecoveredERC721(_tokenAddress, _tokenId);
    }

    // RewardsDuration Control Function
    function setRewardsDuration(uint _newDuration) public onlyOwner {
        rewardsDuration = _newDuration;
    }

    // TokenQuota Control Function
    function setTokenQuota(uint _newQuota) public onlyOwner {
        require(_newQuota > totalSupply, "Too Small Quota");
        tokenQuota = _newQuota;
    }

    // 입력한 토큰에 대한 유저가 가진 정보
    function getStaker(address _l2Ca, address _user) public view returns(Staker memory) {
        return stakers[_l2Ca][_user];
    }

    // 유저가 스테이킹한 토큰 주소소 리스트
    function getStakingTokenList(address _user) public view returns(address[] memory) {
        return stakingTokenList[_user];
    }

    // 유저가 보상 받을 수 있는 토큰 주소소 리스트
    function getClaimTokenList(address _user) public view returns(address[] memory) {
        return claimTokenList[_user];
    }

    // 입력한 토큰에 스테이킹한 유저 주소 리스트
    function getStakerAddress(address _l2Ca) public view returns (address[] memory) {
        return stakerAddress[_l2Ca];
    }

    // 입력한 토큰에 유저가 가진 금액 보여주는 함수
    function getStakerAmount(address _l2Ca, address _user) public view returns (uint) {
        return stakerAmount[_l2Ca][_user];
    }

    // ------------------ Staking Function ------------------ //

    // Staking function
    function stake(address _l2Ca, uint _amount) public nonReentrant whenNotPaused {
        require(rewardToken.balanceOf(address(this)) - ((rewardsDuration * (totalSupply * hanTokenPerLpToken) / 10**18)) > rewardsDuration * ((_amount * hanTokenPerLpToken) / 10**18), "Total amount of rewards is too high");
        require((_amount + totalSupply) <= tokenQuota, "Too Many Token");
        require(totalSupply < tokenQuota, "Already Token Full");
        IMusikhan stakingToken = IMusikhan(_l2Ca);
        require(stakingToken.balanceOf(msg.sender) != 0, "Do Not Have Token");
        findL2TokenList(_l2Ca);
        require(checkL2 == true, "It's not our token");
        checkL2 = false;
        Staker storage staker = stakers[_l2Ca][msg.sender];
        addStakerAddress(_l2Ca);
        stakerAmount[_l2Ca][msg.sender] += _amount;
        totalSupply += _amount;
        if(staker.amountStaked > 0) {
            uint stakedTime = block.timestamp - staker.timeOfLastUpdate;
            staker.unclaimedRewards += stakedTime * ((staker.amountStaked * hanTokenPerLpToken) / 10**18);
            setStaker(_l2Ca, _amount);
            checkTokenAddress(_l2Ca);
            removeMyTokenList(_l2Ca, msg.sender);
        } else{
            setStaker(_l2Ca, _amount);
            checkTokenAddress(_l2Ca);
            removeMyTokenList(_l2Ca, msg.sender);
        }
    }

    // Withdrawal function
    function withdraw(address _l2Ca,uint256 _amount) public nonReentrant {
        IMusikhan stakingToken = IMusikhan(_l2Ca);
        Staker storage staker = stakers[_l2Ca][msg.sender];
        require(staker.amountStaked >= _amount, "Insufficient Balance");
        totalSupply -= _amount;
        uint stakedTime = block.timestamp - staker.timeOfLastUpdate;
        staker.unclaimedRewards += stakedTime * ((staker.amountStaked * hanTokenPerLpToken) / 10**18);
        staker.amountStaked -= _amount;
        staker.timeOfLastUpdate = block.timestamp;
        stakingToken.transfer(msg.sender, _amount);
        addMyTokenList(_l2Ca, msg.sender);
        removeStakerAddress(_l2Ca);
        stakerAmount[_l2Ca][msg.sender] -= _amount;
        emit Withdrawn(_l2Ca, msg.sender, _amount);
        if(staker.amountStaked == 0) {
            removeByValue(_l2Ca, stakingTokenList[msg.sender]);
        }
        if(staker.amountStaked == 0 && staker.unclaimedRewards == 0) {
            removeByValue(_l2Ca, claimTokenList[msg.sender]);
        }
    }

    // Compensation claim function
    function claimReward(address _l2Ca) public nonReentrant {
        Staker storage staker = stakers[_l2Ca][msg.sender];
        require(block.timestamp - staker.timeOfLastUpdate != 0, "Too Early");
        require(staker.unclaimedRewards < rewardToken.balanceOf(address(this)), "Short Reward");
        uint stakedTime = block.timestamp - staker.timeOfLastUpdate;
        staker.unclaimedRewards += stakedTime * ((staker.amountStaked * hanTokenPerLpToken) / 10**18);
        rewardToken.transfer(msg.sender ,staker.unclaimedRewards);
        staker.claimedReward += staker.unclaimedRewards;
        totalReward[msg.sender] += staker.unclaimedRewards;
        emit RewardPaid(_l2Ca, msg.sender, staker.unclaimedRewards);
        staker.unclaimedRewards = 0;
        staker.timeOfLastUpdate = block.timestamp;
        if(staker.amountStaked == 0 && staker.unclaimedRewards == 0) {
            removeByValue(_l2Ca, claimTokenList[msg.sender]);
        }
    }

    // 토큰 주소 저장한 배열에 중복 체크 하는 함수
    function checkTokenAddress(address _l2Ca) internal {
        checkToken(_l2Ca, stakingTokenList[msg.sender]);
        if(check == false) {
            stakingTokenList[msg.sender].push(_l2Ca);
        }
        check = false;
        checkToken(_l2Ca, claimTokenList[msg.sender]);
        if(check == false) {
            claimTokenList[msg.sender].push(_l2Ca);
        }
        check = false;
    }

    // 스테이킹한 정보 저장하는 함수수
    function setStaker(address _l2Ca, uint _amount) internal {
        IMusikhan stakingToken = IMusikhan(_l2Ca);
        Staker storage staker = stakers[_l2Ca][msg.sender];
        stakingToken.transferFrom(msg.sender ,address(this), _amount);
        staker.timeOfLastUpdate = block.timestamp;
        staker.amountStaked += _amount;
        staker.name = stakingToken.name();
        staker.symbol = stakingToken.symbol();
        staker.l2Ca = _l2Ca;
    }

    // 백앤드 API용 배열에 추가하는 함수
    function addStakerAddress(address _l2Ca) internal {
        checkToken(msg.sender, stakerAddress[_l2Ca]);
        if(check == false) {
            stakerAddress[_l2Ca].push(msg.sender);
        }
        check = false;
    }

    // 백앤드 API용 배열에서 pop하는 함수
    function removeStakerAddress(address _l2Ca) internal {
        IMusikhan stakingToken = IMusikhan(_l2Ca);
        if(stakingToken.balanceOf(msg.sender) == 0) {
            removeByValue(msg.sender, stakerAddress[_l2Ca]);
        }
    }

    // 내가 스테이킹한 토큰 리스트에서 pop하는 함수
    function removeMyTokenList(address _l2Ca, address _user) internal {
        IMusikhan musikhanToken = IMusikhan(_l2Ca);
        if(musikhanToken.balanceOf(_user) == 0) {
            musikhan.removeMyTokenList(_l2Ca, _user);
        }
    }

    // 내가 스테이킹한 토큰 리스트에 추가하는 함수
    function addMyTokenList(address _l2Ca, address _user) internal {
        checkMintToken(_l2Ca, _user);
        if(checkMint == false) {
            musikhan.addMyTokenList(_l2Ca, _user);
        }
        checkMint = false;
    }

    // 입력한 토큰 주소가 입력한 토큰리스트 배열에 있는지 확인하는 함수
    function checkToken(address _l2Ca, address[] storage _tokenList) internal {
        for(uint i = 0; i < _tokenList.length; i++) {
            if(_tokenList[i] == _l2Ca) {
                check = true;
            }
        }
    }
    // L2에 배포한 토큰 주소 찾는 함수
    function checkMintToken(address _l2Ca, address _user) internal {
        for(uint i = 0; i < musikhan.getMyTokenList(_user).length; i++) {
            if(musikhan.getMyTokenList(_user)[i] == _l2Ca) {
                checkMint = true;
            }
        }
    }


    // L2에 배포한 토큰 주소 찾는 함수
    function findL2TokenList(address _l2Ca) internal {
        for(uint i = 0; i <= musikhan.getL2TokenList().length -1; i++) {
            if(musikhan.getL2TokenList()[i] == _l2Ca) {
                checkL2 = true;
            }
        }
    }

    function find(address _value, address[] storage _tokenList) private view returns (uint) {
        uint i = 0;
        while (_tokenList[i] != _value) {
            i++;
        }
        return i;
    }
    function removeByIndex(uint i, address[] storage _tokenList) private {
        while (i < _tokenList.length - 1) {
            _tokenList[i] = _tokenList[i + 1];
            i++;
        }
        _tokenList.pop();
    }
    function removeByValue(address _value, address[] storage _tokenList) private {
        uint i = find(_value, _tokenList);
        removeByIndex(i, _tokenList);
    }


    // ------------------ EVENTS ------------------ //

    event Staked(address indexed ca, address indexed user, uint256 amount);
    event Withdrawn(address indexed ca, address indexed user, uint256 amount);
    event RewardPaid(address indexed ca, address indexed user, uint256 rewardAmount);
    event RecoveredERC20(address token, uint256 amount);
    event RecoveredERC721(address token, uint256 tokenId);
}
