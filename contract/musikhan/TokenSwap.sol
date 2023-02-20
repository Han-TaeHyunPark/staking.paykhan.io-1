//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./IMusikhan.sol";
import "./Musikhan.sol";

contract TokenSwap is Ownable{
    Musikhan private musikhan;


    constructor(address _musikhan) {
        musikhan = Musikhan(_musikhan);
    }

    function recoverERC20(address _tokenAddress, uint256 _tokenAmount) external onlyOwner {
        IERC20(_tokenAddress).transfer(msg.sender, _tokenAmount);
        emit RecoveredERC20(_tokenAddress, _tokenAmount);
    }

    function recoverERC721(address _tokenAddress, uint256 _tokenId) external onlyOwner {
        IERC721(_tokenAddress).safeTransferFrom(address(this), msg.sender, _tokenId);
        emit RecoveredERC721(_tokenAddress, _tokenId);
    }

    // L2에 있던 토큰 IMusikhan으로 바꾸는 함수
    function swapToken(address _existedToken, address _musikhanToken) public {
        IERC20Metadata token = IERC20Metadata(_existedToken);
        uint amount = token.balanceOf(msg.sender);
        bytes memory data;
        data = abi.encode(token.name(), token.symbol(), amount, _existedToken, _musikhanToken);
        musikhan.setExistedTokenData(msg.sender, data);
        musikhan.mintL2SwapToken(_musikhanToken, msg.sender);
        token.transferFrom(msg.sender, address(this) ,amount);
        emit SwapTokenData(amount, _existedToken, _musikhanToken, msg.sender);
    }

    event RecoveredERC20(address token, uint256 amount);
    event RecoveredERC721(address token, uint256 tokenId);
    event SwapTokenData(uint amount, address indexed existedToken, address indexed musikhanToken, address indexed user);
}