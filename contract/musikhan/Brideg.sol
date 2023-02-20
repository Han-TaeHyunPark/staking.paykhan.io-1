//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@eth-optimism/contracts/libraries/bridge/ICrossDomainMessenger.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Bridge is Ownable{
    address private musikhan;
    ICrossDomainMessenger private crossDomainMessenger;

    constructor(address _musikhan) {
        crossDomainMessenger = ICrossDomainMessenger(0x5086d1eEF304eb5284A0f6720f79403b4e9bE294); // test net
        // crossDomainMessenger = ICrossDomainMessenger(0x25ace71c97B33Cc4729CF772ae268934F7ab5fA1); // main net
        musikhan = _musikhan;
    }

    function setTime() private view returns (uint) {
        return block.timestamp;
    }

    function recoverERC20(address _tokenAddress, uint256 _tokenAmount) external onlyOwner {
        IERC20(_tokenAddress).transfer(msg.sender, _tokenAmount);
        emit RecoveredERC20(_tokenAddress, _tokenAmount);
    }

    function recoverERC721(address _tokenAddress, uint256 _tokenId) external onlyOwner {
        IERC721(_tokenAddress).safeTransferFrom(address(this), msg.sender, _tokenId);
        emit RecoveredERC721(_tokenAddress, _tokenId);
    }

    // L1에 있는 토큰 L2로 보내는 함수
    function sendToken(address _l1Ca, address _l2Ca) public {
        IERC20Metadata token = IERC20Metadata(_l1Ca);
        require(token.balanceOf(msg.sender) !=0, "amount is insufficient");
        uint amount = token.balanceOf(msg.sender);
        token.transferFrom(msg.sender, address(this) ,amount);
        bytes memory tokenData;
        bytes memory tokenAddress;
        tokenData = abi.encode(token.name(), token.symbol(), amount, _l1Ca, setTime());
        tokenAddress = abi.encode(_l2Ca);
        crossDomainMessenger.sendMessage(musikhan, abi.encodeWithSignature("setUser(address)", msg.sender), 1000000);
        crossDomainMessenger.sendMessage(musikhan, abi.encodeWithSignature("setL1TokenData(bytes)", tokenData), 1000000);
        crossDomainMessenger.sendMessage(musikhan, abi.encodeWithSignature("setL1TokenAddress(bytes)", tokenAddress), 1000000);
        emit L1TokenData(msg.sender, _l1Ca, _l2Ca ,amount);
    }

    event L1TokenData(address indexed user, address indexed l1TokenCa, address indexed l2TokenCa,  uint amount);
    event RecoveredERC20(address token, uint256 amount);
    event RecoveredERC721(address token, uint256 tokenId);
}