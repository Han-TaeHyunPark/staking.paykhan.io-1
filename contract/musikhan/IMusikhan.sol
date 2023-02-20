// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

import "./Musikhan.sol";
import "./MusikhanAirdrop.sol";
import "./MusikhanTokenFactory.sol";

contract IMusikhan is ERC20, ERC20Burnable, ERC20Snapshot, Ownable, Pausable {

    bool public check;
    Musikhan private musikhan;
    MusikhanAirdrop private airdrop;
    MusikhanTokenFactory public factory;
    uint256 private constant cap = 2000 ether;

    constructor(string memory _name, string memory _symbol, address airdropCa, address musikhanCa, address tokenFactoryCa, bool boolean) ERC20(_name, _symbol) {
        musikhan = Musikhan(musikhanCa);
        check = boolean;
        airdrop = MusikhanAirdrop(airdropCa);
        factory = MusikhanTokenFactory(tokenFactoryCa);
    }

    function mint(address to, uint256 amount) public {
        require(totalSupply() + amount <= cap, "finished");
        require(musikhan.owner() == owner(), "Unknown token");
        require(msg.sender == address(musikhan), "Wrong approach");
        _mint(to, amount);
    }

    function mintSwapToken(address to, uint256 amount) public {
        require(totalSupply() + amount <= cap, "finished");
        _mint(to, amount);
    }

    function transferAirdrop(address from, address to, uint256 amount) public virtual returns (bool) {
        require(msg.sender == address(airdrop), "Wrong approach");
        _transfer(from, to, amount);
        return true;
    }

    function snapshot() public onlyOwner {
        _snapshot();
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override(ERC20, ERC20Snapshot)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}