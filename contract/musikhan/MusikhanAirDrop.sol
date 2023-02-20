// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "./IMusikhan.sol";
import "./Musikhan.sol";

contract MusikhanAirdrop is Ownable, Pausable {
    Musikhan private musikhan;

    constructor(address _musikhan) {
        musikhan = Musikhan(_musikhan);
    }

    struct AirdropToken {
        bytes32 root;
        uint256 startTime;
        uint256 claimDuration;
        uint256 userNumber;
        address[] whitelistClaimed;
    }

    mapping(address => AirdropToken) private airdropToken;
    address[] private canClaimTokenList;

    function getCanClaimTokenList() public view returns (address[] memory) {
        return canClaimTokenList;
    }

    function addCanClaimTokenList(address _musikhanToken) public {
        IMusikhan musikhanToken = IMusikhan(_musikhanToken);
        require(musikhanToken.check() == true, "It's not our token");
        require(msg.sender == address(musikhanToken.factory()), "Wrong approach");
        canClaimTokenList.push(_musikhanToken);
    }

    function getAirdropTokenData(address _musikhanToken) public view returns (AirdropToken memory) {
        return airdropToken[_musikhanToken];
    }

    function setClaimDuration(uint256 _newDuration, address _musikhanToken) public onlyOwner {
        AirdropToken storage airdrop = airdropToken[_musikhanToken];
        require(airdrop.claimDuration != _newDuration, "Same duration");
        airdrop.claimDuration = _newDuration;
    }

    function remainingDuration(address _musikhanToken) public view returns (uint256) {
        AirdropToken storage airdrop = airdropToken[_musikhanToken];
        require(block.timestamp < (airdrop.startTime + airdrop.claimDuration), "No remaining duration");
        uint256 duration;
        duration = airdrop.claimDuration - (block.timestamp - airdrop.startTime);
        return duration;
    }

    function setRoot(bytes32 _root, uint256 _userNumber, address _musikhanToken) public onlyOwner {
        AirdropToken storage airdrop = airdropToken[_musikhanToken];
        address[] memory reset;
        bool check;
        require(airdrop.root != _root, "Same root");
        require(block.timestamp > (airdrop.startTime + airdrop.claimDuration), "claimDuration must be exceeded in order to update root");
        for(uint i = 0; i < canClaimTokenList.length; i++) {
            if(canClaimTokenList[i] == _musikhanToken) {
                airdrop.root = _root;
                airdrop.userNumber = _userNumber;
                airdrop.startTime = block.timestamp;
                airdrop.claimDuration = 7 days;
                airdrop.whitelistClaimed = reset;
                check = true;
                emit SetRoot( _root, _userNumber, _musikhanToken);
            }
        }
        if(!check) {
            revert("It's not our token");
        }
    }

    // helper for the dapp
    function canClaim(bytes32[] memory _merkleProof, uint256 _amount, address _musikhanToken) public view returns (bool) {
        AirdropToken storage airdrop = airdropToken[_musikhanToken];
        require(block.timestamp <= (airdrop.startTime + airdrop.claimDuration), "Claim is not allowed after claimDuration");
        bytes32 result = leaf(_amount);
        require(MerkleProof.verify(_merkleProof, airdrop.root, result), "Proof is not valid");
        require(!claimed(_merkleProof, _amount, _musikhanToken), "Address has already claimed.");
        return true;
    }

    // Check if a given reward has already been claimed
    function claimed(bytes32[] memory _merkleProof, uint256 _amount, address _musikhanToken) public view returns (bool) {
        AirdropToken storage airdrop = airdropToken[_musikhanToken];
        bool checkClaimed = false;
        bytes32 result = leaf(_amount);
        require(MerkleProof.verify(_merkleProof, airdrop.root, result), "Proof is not valid");
        if(airdrop.whitelistClaimed.length > 0) {
            for(uint i = 0; i < airdrop.whitelistClaimed.length; i++) {
                if(airdrop.whitelistClaimed[i] == msg.sender) {
                    checkClaimed = true;
                }
            }
        }
        return checkClaimed;
    }

    // Get airdrop tokens assigned to address
    // Requires sending merkle proof to the function
    function claim(bytes32[] memory _merkleProof, uint256 _amount, address _musikhanToken) public whenNotPaused {
        AirdropToken storage airdrop = airdropToken[_musikhanToken];
        IMusikhan token = IMusikhan(_musikhanToken);
        require(block.timestamp <= (airdrop.startTime + airdrop.claimDuration), "Claim is not allowed after claimDuration");
        require(token.balanceOf(_musikhanToken) >= _amount, "Contract doesnt have enough tokens");
        if(airdrop.whitelistClaimed.length > 0) {
            for(uint i = 0; i < airdrop.whitelistClaimed.length; i++) {
                if(airdrop.whitelistClaimed[i] == msg.sender) {
                    revert("Already Claimed");
                }
            }
        }
        bytes32 result = leaf(_amount);
        require(MerkleProof.verify(_merkleProof, airdrop.root, result), "Proof is not valid");
        require(!claimed(_merkleProof, _amount, _musikhanToken), "Address has already claimed.");
        uint claimAmount = _amount;
        musikhan.addMyTokenList(_musikhanToken, msg.sender);
        token.transferAirdrop(_musikhanToken, msg.sender, claimAmount);
        airdrop.whitelistClaimed.push(msg.sender);
        removeMusikhanToken(_musikhanToken);
        emit Claim(msg.sender, claimAmount, block.timestamp);
    }

    function pause() public onlyOwner {
        _pause();
    }
    function unpause() public onlyOwner {
        _unpause();
    }

    function recoverERC20(address _tokenAddress, uint256 _tokenAmount) external onlyOwner {
        IERC20(_tokenAddress).transfer(msg.sender, _tokenAmount);
        emit RecoveredERC20(_tokenAddress, _tokenAmount);
    }

    function recoverERC721(address _tokenAddress, uint256 _tokenId) external onlyOwner {
        IERC721(_tokenAddress).safeTransferFrom(address(this), msg.sender, _tokenId);
        emit RecoveredERC721(_tokenAddress, _tokenId);
    }

    function leaf(uint256 _amount) internal view returns (bytes32){
        string memory l_amount=Strings.toString(_amount);
        string memory l_acc = Strings.toHexString(msg.sender);
        string memory result = string(abi.encodePacked(l_acc,',',l_amount));
        return(keccak256(abi.encodePacked(result)));
    }

    function whitelistClaimedLength(address _musikhanToken) internal view returns(uint) {
        AirdropToken storage airdrop = airdropToken[_musikhanToken];
        return airdrop.whitelistClaimed.length;
    }

    function userNumberLength(address _musikhanToken) internal view returns (uint) {
        AirdropToken storage airdrop = airdropToken[_musikhanToken];
        return airdrop.userNumber;
    }

    function removeMusikhanToken(address _musikhanToken) internal {
        if(userNumberLength(_musikhanToken) - whitelistClaimedLength(_musikhanToken) == 0) {
            removeByValue(_musikhanToken, canClaimTokenList);
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

    event Claim(address claimer, uint256 claimAmount, uint timestamp);
    event SetRoot(bytes32 root, uint256 userNumber, address indexed musikhanToken);
    event RecoveredERC20(address token, uint256 amount);
    event RecoveredERC721(address token, uint256 tokenId);
}