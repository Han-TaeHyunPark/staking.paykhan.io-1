// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV2V3Interface.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * Contract which implements a merkle airdrop for a given token
 * Based on an account balance snapshot stored in a merkle tree
 */
contract Airdrop is Ownable, Pausable {
    IERC20 public token; // Airdrop token
    uint8 public decimals;
    bytes32 public root; // merkle tree root
    uint256 public startTime;
    uint256 public claimDuration = 7 days; // 604800
    address[] public whitelistClaimed;
    uint256 private constant GRACE_PERIOD_TIME = 3600;

    error SequencerDown();
    error GracePeriodNotOver();

    address public base = 0x13e3Ee699D1909E989722E753853AE30b17e08c5; // ETH/USD Otimism
    // address public base = 0x57241A37733983F97C4Ab06448F244A1E0Ca0ba8; // ETH/USD Optimism Goerli

    address public sequencerUptimeProxy = 0x371EAD81c9102C9BF4874A9075FFFf170F2Ee389; // Optimism
    // address public sequencerUptimeProxy = 0x4C4814aa04433e0FB31310379a4D6946D5e1D353; // Optimism goerli

    AggregatorV2V3Interface internal baseFeed = AggregatorV2V3Interface(base);
    AggregatorV2V3Interface internal sequencerUptimeFeed = AggregatorV2V3Interface(sequencerUptimeProxy);

    uint8 baseDecimals = baseFeed.decimals();

    constructor(IERC20 _token, uint8 _decimals, bytes32 _root) onlyOwner {
        require(_decimals > baseDecimals && _decimals <= uint8(18), "Invalid _decimals");
        token = _token;
        decimals = _decimals;
        root = _root;
        startTime = block.timestamp;
    }

    function getWhitelistClaimed() public view returns(address[] memory) {
        return whitelistClaimed;
    }

    function setClaimDuration(uint256 _newDuration) public onlyOwner {
        require(claimDuration != _newDuration, "Same duration");
        claimDuration = _newDuration;
    }

    function setBase(address _base) public onlyOwner {
        require(base != _base, "Same base");
        base = _base;
    }

    function setSequencerUptimeProxy(address _sequencerUptimeProxy) public onlyOwner {
        require(sequencerUptimeProxy != _sequencerUptimeProxy, "Same sequencerUptimeProxy");
        sequencerUptimeProxy = _sequencerUptimeProxy;
    }

    function setRoot(bytes32 _root) public onlyOwner {
        require(root != _root, "Same root");
        require(block.timestamp > (startTime + claimDuration), "claimDuration must be exceeded in order to update root");
        address[] memory reset;
        root = _root;
        startTime = block.timestamp;
        whitelistClaimed = reset;
    }

    // helper for the dapp
    function canClaim(bytes32[] memory merkleProof, uint256 amount) external view returns (bool) {
        require(block.timestamp <= (startTime + claimDuration), "Claim is not allowed after claimDuration");
        bytes32 result = leaf(amount);
        require(MerkleProof.verify(merkleProof, root, result), "Proof is not valid");
        require(!claimed(merkleProof, amount), "Address has already claimed.");
        return true;
    }

    // Check if a given reward has already been claimed
    function claimed(bytes32[] memory merkleProof, uint256 amount) public view returns (bool) {
        // Compute the merkle leaf from recipient and amount
        bool checkClaimed = false;
        bytes32 result = leaf(amount);
        require(MerkleProof.verify(merkleProof, root, result), "Proof is not valid");
        if(whitelistClaimed.length > 0) {
            for(uint i = 0; i < whitelistClaimed.length; i++) {
                if(whitelistClaimed[i] == msg.sender) {
                    checkClaimed = true;
                }
            }
        }
        return checkClaimed;
    }

    function leaf(uint256 amount) internal view returns(bytes32){
        string memory l_amount=Strings.toString(amount);
        string memory l_acc = Strings.toHexString(msg.sender);
        string memory result = string(abi.encodePacked(l_acc,',',l_amount));
        // Compute the merkle leaf from recipient and amount
        return(keccak256(abi.encodePacked(result)));
    }

    function remainingDuration() public view returns (uint256) {
        require(block.timestamp < (startTime + claimDuration), "No remaining duration");
        uint256 duration;
        duration = claimDuration - (block.timestamp - startTime);
        return duration;
    }

    function getLatestPrice() public view returns (int) {
        (
            , /*uint80 roundId*/ int256 answer, uint256 startedAt /*uint256 updatedAt*/ /*uint80 answeredInRound*/, ,
        ) = sequencerUptimeFeed.latestRoundData();

        // Answer == 0: Sequencer is up
        // Answer == 1: Sequencer is down
        bool isSequencerUp = answer == 0;
        if (!isSequencerUp) {
            revert SequencerDown();
        }

        // Make sure the grace period has passed after the sequencer is back up.
        uint256 timeSinceUp = block.timestamp - startedAt;
        if (timeSinceUp <= GRACE_PERIOD_TIME) {
            revert GracePeriodNotOver();
        }
        (
            , /*uint80 roundID*/ int price /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/, , ,
        ) = baseFeed.latestRoundData();
        return price;
    }

    // Get airdrop tokens assigned to address
    // Requires sending merkle proof to the function
    function claim(bytes32[] memory merkleProof, uint256 amount) public whenNotPaused {
        require(block.timestamp <= (startTime + claimDuration), "Claim is not allowed after claimDuration");
        require(token.balanceOf(address(this)) >= amount, "Contract doesnt have enough tokens");
        if(whitelistClaimed.length > 0) {
            for(uint i = 0; i < whitelistClaimed.length; i++) {
                if(whitelistClaimed[i] == msg.sender) {
                    revert("Already Claimed");
                }
            }
        }

        // verify the proof is valid
        bytes32 result = leaf(amount);
        require(MerkleProof.verify(merkleProof, root, result), "Proof is not valid");
        require(!claimed(merkleProof, amount), "Address has already claimed.");

        // Redeem!
        (, int256 answer, uint256 startedAt, , ) = sequencerUptimeFeed.latestRoundData();
        bool isSequencerUp = answer == 0;
        if (!isSequencerUp) {
            revert SequencerDown();
        }
        uint256 timeSinceUp = block.timestamp - startedAt;
        if (timeSinceUp <= GRACE_PERIOD_TIME) {
            revert GracePeriodNotOver();
        }
        (, int256 price, , , ) = baseFeed.latestRoundData();
        uint claimAmount = amount * 10 ** decimals / uint(price);
        token.transfer(msg.sender, claimAmount);
        whitelistClaimed.push(msg.sender);
        emit Claim(msg.sender, claimAmount, block.timestamp);
    }

    function recoverERC20(address _tokenAddress, uint256 _tokenAmount) external onlyOwner {
        IERC20(_tokenAddress).transfer(msg.sender, _tokenAmount);
        emit RecoveredERC20(_tokenAddress, _tokenAmount);
    }

    function recoverERC721(address _tokenAddress, uint256 _tokenId) external onlyOwner {
        IERC721(_tokenAddress).safeTransferFrom(address(this), msg.sender, _tokenId);
        emit RecoveredERC721(_tokenAddress, _tokenId);
    }

    event Claim(address claimer, uint256 claimAmount, uint timestamp);
    event RecoveredERC20(address token, uint256 amount);
    event RecoveredERC721(address token, uint256 tokenId);
}