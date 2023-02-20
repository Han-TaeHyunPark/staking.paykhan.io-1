//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

import "./IMusikhan.sol";

contract Musikhan is Ownable {

    constructor() {
        l1TokenList.push(address(this));
        l2TokenList.push(address(this));
    }

    // Ll에서 crossDomain으로 넘어온 정보
    struct L1TokenInfo {
        string name;
        string symbol;
        uint amount;
        address l1Ca;
        address l2Ca;
        uint receivedTime;
    }

    // TokenFactory에서 베포한 L2Token 정보
    struct L2TokenInfo {
        string name;
        string symbol;
        address l1Ca;
        address l2Ca;
        address existedToken;
        address owner;
        bytes32 root;
    }

    struct ExistedTokenInfo {
        string name;
        string symbol;
        uint amount;
        address existedTokenCa;
        address swapTokenCa;
        address owner;
    }

    mapping(address => L1TokenInfo) private l1Tokens;
    mapping(address => L2TokenInfo) private l2Tokens;
    mapping(address => ExistedTokenInfo) private existedTokens;

    address private user;
    bool private checkL1;
    bool private checkL2;
    bool private checkMint;
    bool private check;
    uint private defaultTime = 120; //20분 수정정
    address[] private l1TokenList;
    address[] private l2TokenList;
    address[] private lostTokenList;
    mapping(address => address[]) private myTokenList; // 내가 민팅한 토큰 리스트
    mapping(address => uint) private lostTokenAmount;



    // L1TokenAddress 배열 출력 함수
    function getL1TokenList() public view returns (address[] memory) {
        return l1TokenList;
    }
    // L2TokenAddress 배열 출력 함수
    function getL2TokenList() public view returns (address[] memory) {
        return l2TokenList;
    }
    // 오너가 민팅해준 함수 리스트트
    function getLostTokenList() public view returns (address[] memory) {
        return lostTokenList;
    }

    function getExistedTokenInfo(address _user) public view returns (ExistedTokenInfo memory) {
        return existedTokens[_user];
    }

    // L1TokenAddress 추가 함수
    function addL1TokenAddress(address _l1Ca) public onlyOwner {
        findL1TokenList(_l1Ca);
        require(checkL1 != true, "This address is already registered");
        l1TokenList.push(_l1Ca);
    }
    // L2 Bridge 용 토큰 주소 추가 함수
    function addTokenAddress(address _l2Ca) public {
        L2TokenInfo storage l2Token = l2Tokens[_l2Ca];
        IMusikhan musikhanToken = IMusikhan(_l2Ca);
        require(musikhanToken.check() == true, "It's not our token");
        require(l2Token.owner == owner(), "Wrong approach");
        findL2TokenList(_l2Ca);
        if(checkL2 == false) {
            l2TokenList.push(_l2Ca);
        } else {
            checkL2 = false;
            revert("already exists");
        }
    }


    // 내 주소 입력시 L1TokenInfo 출력 함수
    function getL1TokenInfo(address _user) public view returns (L1TokenInfo memory) {
        return l1Tokens[_user];
    }
    // 토큰 주소 입력시 L2TokenInfo 출력 함수
    function getL2TokenInfo(address _l2Ca) public view returns (L2TokenInfo memory) {
        return l2Tokens[_l2Ca];
    }

    // 주소 입력시 내가 민팅한 토큰 리스트 출력
    function getMyTokenList(address _user) public view returns(address[] memory) {
        return myTokenList[_user];
    }

    // 내가 민팅한 토큰 주소 배열에서 pop하는 함수
    function removeMyTokenList(address _l2Ca, address _user) public {
        IMusikhan musikhanToken = IMusikhan(_l2Ca);
        if(musikhanToken.balanceOf(_user) == 0) {
            removeByValue(_l2Ca, myTokenList[_user]);
        }
    }

    // 내가 민팅한 토큰 주소 배열에 추가하는 함수
    function addMyTokenList(address _l2Ca, address _user) public {
        findL2MintTokenList(_l2Ca);
        if(checkMint == false) {
            myTokenList[_user].push(_l2Ca);
        }else {
            checkMint = false;
            revert("This address already exists");
        }
    }

    // 내가 입력한 토큰 주소에 오너가 민팅한 금액 출력 함수수
    function getLostTokenAmount(address _l2Ca) public view returns(uint) {
        return lostTokenAmount[_l2Ca];
    }

    // L1에서 데이터를 보낸 유저 주소
    // 확인 필수!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    function setUser(address _user) public {
        require(msg.sender == 0x4200000000000000000000000000000000000007, "Wrong approach");
        user = _user;
    }

    // L1에서 crossDomain으로 넘어온 정보 저장하는 함수
    function setL1TokenData(bytes memory _data) public {
        L1TokenInfo storage l1Token = l1Tokens[user];
        (l1Token.name, l1Token.symbol, l1Token.amount, l1Token.l1Ca , l1Token.receivedTime) = abi.decode(_data, (string, string, uint, address, uint));
        emit L1TokenData(l1Token.name, l1Token.symbol, l1Token.amount, l1Token.l1Ca, user);
        findL1TokenList(l1Token.l1Ca);
        require(checkL1 == true, "It's not our token");
        checkL1 = false;
    }

    // L1에서 crossDomain으로 넘어온 정보 저장하는 함수
    function setL1TokenAddress(bytes memory _data) public {
        L1TokenInfo storage l1Token = l1Tokens[user];
        (l1Token.l2Ca) = abi.decode(_data, (address));
        findL1TokenList(l1Token.l1Ca);
        require(checkL1 == true, "It's not our token");
        checkL1 = false;
    }

    // TokenFactory에서 배포한 Bridge용 토큰 정보 저장하는 함수
    function setL2TokenData(address _l2Ca , bytes memory _data) public {
        L2TokenInfo storage l2Token = l2Tokens[_l2Ca];
        (l2Token.name, l2Token.symbol, l2Token.l1Ca, l2Token.l2Ca, l2Token.owner) = abi.decode(_data, (string, string, address, address, address));
        emit BridgeL2TokenData(l2Token.name, l2Token.symbol, l2Token.l1Ca, l2Token.l2Ca, l2Token.owner);
    }

    // TokenFactory에서 배포한 L2 토큰 정보 저장하는 함수
    function setNewL2TokenData(address _l2Ca , bytes memory _data) public {
        L2TokenInfo storage l2Token = l2Tokens[_l2Ca];
        (l2Token.name, l2Token.symbol, l2Token.l2Ca, l2Token.owner, l2Token.root) = abi.decode(_data, (string, string, address, address, bytes32));
        emit NewL2TokenData(l2Token.name, l2Token.symbol, l2Token.l2Ca, l2Token.owner);
    }

    function setExistedTokenData(address _user, bytes memory _data) public {
        ExistedTokenInfo storage existedToken = existedTokens[_user];
        (existedToken.name, existedToken.symbol, existedToken.amount, existedToken.existedTokenCa, existedToken.swapTokenCa) =abi.decode(_data, (string, string, uint, address, address));
        emit ExistedTokenData(existedToken.name, existedToken.symbol, existedToken.amount, existedToken.existedTokenCa, existedToken.swapTokenCa);
    }

    function setL2SwapTokenData(address _l2SwapToken, bytes memory _data) public {
        L2TokenInfo storage l2Token = l2Tokens[_l2SwapToken];
        (l2Token.name, l2Token.symbol, l2Token.l2Ca, l2Token.existedToken, l2Token.owner) = abi.decode(_data, (string, string, address, address, address));
        emit L2SwapTokenData(l2Token.name, l2Token.symbol, l2Token.l2Ca, l2Token.existedToken, l2Token.owner);
    }


   // 가지고 있는 토큰 주소 입력시 저장된 amount 만큼 민팅
    function mint(address _l2Ca) public {
        findL2TokenList(_l2Ca);
        require(checkL2 == true, "It's not our token");
        L1TokenInfo storage l1Token = l1Tokens[msg.sender];
        L2TokenInfo storage l2Token = l2Tokens[_l2Ca];
        require(l1Token.l2Ca == l2Token.l2Ca, "Token do not match");
        require(block.timestamp >= (l1Token.receivedTime + defaultTime), "Need more time");
        require(l1Token.amount != 0, "No amount sent");
        IMusikhan musikhanToken = IMusikhan(_l2Ca);
        musikhanToken.mint(msg.sender, l1Token.amount);
        emit MintBridgeL2Token(l1Token.amount, _l2Ca, msg.sender);
        l1Token.amount = 0;
        l1Token.l1Ca = (address(0));
        checkL2 = false;
        findL2MintTokenList(_l2Ca);
        if(checkMint == false) {
            myTokenList[msg.sender].push(_l2Ca);
        }else {
            checkMint = false;
        }
    }

    // 토큰 주소 입력시 2000 이더 토큰 주소한테 민팅팅
    function mintNewL2Token(address _l2Ca) public {
        findL2TokenList(_l2Ca);
        require(checkL2 == true, "It's not our token");
        IMusikhan musikhanToken = IMusikhan(_l2Ca);
        musikhanToken.mint(_l2Ca, 2000 ether);
        emit MintNewL2Token(2000 ether, _l2Ca, msg.sender);
        checkL2 = false;
        findL2MintTokenList(_l2Ca);
        if(checkMint == false) {
            myTokenList[msg.sender].push(_l2Ca);
        }else {
            checkMint = false;
        }
    }
       // 가지고 있는 토큰 주소 입력시 저장된 amount 만큼 민팅
    function mintL2SwapToken(address _l2Ca, address _user) public {
        findL2TokenList(_l2Ca);
        require(checkL2 == true, "It's not our token");
        ExistedTokenInfo storage existedToken = existedTokens[_user];
        L2TokenInfo storage l2Token = l2Tokens[_l2Ca];
        require(existedToken.existedTokenCa == l2Token.existedToken, "Token do not match");
        require(existedToken.amount != 0, "No amount sent");
        IMusikhan musikhanToken = IMusikhan(_l2Ca);
        musikhanToken.mintSwapToken(_user, existedToken.amount);
        emit L2SwapTokenData(l2Token.name, l2Token.symbol, existedToken.existedTokenCa, l2Token.l2Ca, _user);
        existedToken.amount = 0;
        checkL2 = false;
        findL2MintTokenList(_l2Ca);
        if(checkMint == false) {
            myTokenList[_user].push(_l2Ca);
        }else {
            checkMint = false;
        }
    }

    // 유저한테 민팅해주는 함수
    function lostTokenMint(address _l2Ca, address _user,uint _amount) public onlyOwner {
        findL2TokenList(_l2Ca);
        require(checkL2 == true, "It's not our token");
        checkL2 = false;
        IMusikhan musikhanToken = IMusikhan(_l2Ca);
        musikhanToken.mint(_user, _amount);
        lostTokenList.push(_l2Ca);
        lostTokenAmount[_l2Ca] += _amount;
        emit LostMint(_amount, _l2Ca, _user);
    }

    // 입력한 토큰 주소가 입력한 토큰리스트 배열에 있는지 확인하는 함수
    function checkToken(address _l2Ca, address[] storage _tokenList) internal {
        for(uint i = 0; i < _tokenList.length; i++) {
            if(_tokenList[i] == _l2Ca) {
                check = true;
            }
        }
    }

    // 내가 민팅한 토큰 주소 배열에 중복 체크 하는 함수
    function findL2MintTokenList(address _ca) internal {
        for(uint i = 0; i < myTokenList[msg.sender].length; i++) {
            if(myTokenList[msg.sender][i] == _ca) {
                checkMint = true;
            }
        }
    }

    // L1에 배포한 토큰 주소 찾는 함수
    function findL1TokenList(address _ca) internal  {
        for(uint i = 0; i <= l1TokenList.length -1; i++) {
            if(l1TokenList[i] == _ca) {
                checkL1 = true;
            }
        }
    }
    // L2에 배포한 토큰 주소 찾는 함수
    function findL2TokenList(address _ca) internal {
        for(uint i = 0; i <= l2TokenList.length -1; i++) {
            if(l2TokenList[i] == _ca) {
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

    event L1TokenData(string name, string symbol, uint amount, address indexed ca, address indexed user);
    event BridgeL2TokenData(string name, string symbol, address indexed l1TokenAddress, address indexed l2TokenAddress, address indexed owner);
    event NewL2TokenData(string name, string symbol, address indexed TokenAddress, address indexed owner);
    event L2SwapTokenData(string name, string symbol,address indexed existedTokenAddress, address indexed swapTokenAddress, address indexed user);
    event ExistedTokenData(string name, string symbol, uint amount, address indexed existedTokenAddress, address indexed swapTokenAddress);
    event MintBridgeL2Token(uint amount, address indexed l2Ca, address indexed user);
    event MintNewL2Token(uint amount, address indexed l2Ca, address indexed user);
    event LostMint(uint amount, address indexed l2Ca, address indexed user);

}