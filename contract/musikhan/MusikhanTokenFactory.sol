// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./IMusikhan.sol";
import "./Musikhan.sol";
import "./MusikhanAirdrop.sol";

contract MusikhanTokenFactory is Ownable {
  Musikhan private musikhan;
  MusikhanAirdrop private airdrop;

  constructor(address _musikhan, address _airdrop) {
    musikhan = Musikhan(_musikhan);
    airdrop = MusikhanAirdrop(_airdrop);
  }

  // Bridge용 L2 토큰 만드는 함수
  function createToken(string memory _name, string memory _symbol, address _l1Ca) public onlyOwner returns(address)  {
    IMusikhan newToken  = new IMusikhan(_name, _symbol, address(airdrop), address(musikhan), address(this), true);
    newToken.transferOwnership(msg.sender);
    musikhan.setL2TokenData(address(newToken), abi.encode(_name, _symbol, _l1Ca, address(newToken), msg.sender));
    musikhan.addTokenAddress(address(newToken));
    emit BridgeTokenData(_name, _symbol, _l1Ca, address(newToken), msg.sender);
    return address(newToken);
  }

  // L2 에서 토큰 만드는 함수
  function createNewL2Token(string memory _name, string memory _symbol, bytes32 _root) public onlyOwner returns(address) {
    IMusikhan newToken  = new IMusikhan(_name, _symbol, address(airdrop), address(musikhan), address(this), true);
    newToken.transferOwnership(msg.sender);
    musikhan.setNewL2TokenData(address(newToken), abi.encode(_name, _symbol, address(newToken), msg.sender, _root));
    musikhan.addTokenAddress(address(newToken));
    musikhan.mintNewL2Token(address(newToken));
    airdrop.addCanClaimTokenList(address(newToken));
    emit NewL2TokenData(_name, _symbol, address(newToken), msg.sender);
    return address(newToken);
  }

  function createL2SwapToken(string memory _name, string memory _symbol, address _existedToken) public returns(address) {
    IMusikhan newToken  = new IMusikhan(_name, _symbol, address(airdrop), address(musikhan), address(this), true);
    newToken.transferOwnership(msg.sender);
    musikhan.setL2SwapTokenData(address(newToken), abi.encode(_name, _symbol, address(newToken), _existedToken, msg.sender));
    musikhan.addTokenAddress(address(newToken));
    emit L2SwapTokenData(_name, _symbol, address(newToken), _existedToken, msg.sender);
    return address(newToken);
  }
  event NewL2TokenData(string name, string symbol, address indexed tokenAddress, address indexed owner);
  event BridgeTokenData(string name, string symbol,address indexed l1TokenAddress, address indexed l2TokenAddress, address indexed owner);
  event L2SwapTokenData(string name, string symbol, address indexed tokenAddress, address indexed existedToken,address indexed owner);
}