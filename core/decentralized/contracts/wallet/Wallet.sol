// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
import '../token/DetokToken.sol';
import '../library/ObjStruct.sol';
import "../../node_modules/openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";

/* @title Wallet
 * @author Wanggyu, suh
 * Contract wallet
 */
contract Wallet {
    DetokToken token;
    mapping(address => bool) allowedAddress;
    mapping(address => ObjStruct.Copyrighter) copyrighters;
    using SafeERC20 for DetokToken;
    modifier onlyAllowed(){
        require(allowedAddress[msg.sender] == true,"Only allowed contract can access");
        _;
    }
    /* TODO : ether 등록비를 이쪽으로 받을것 */
    /*
    fallback() external payable {

    }

    function payEther(address[10] memory _target, uint256 amount) public {

    }
    */
    function deposit(uint256 _amount, address _target) public onlyAllowed {
        require(copyrighters[_target].ableCopyrighter, "You are not Copyrighter");
        token.safeTransferFrom(_target, address(this), _amount);
        increaseBalance(_target, _amount);
    }

    function withdraw(uint256 _amount, address _target) public onlyAllowed {
        decreaseBalance(_target, _amount);
        token.safeTransfer(_target, _amount);
    }

    function tokenTransfer(address _to, address _target, uint256 _amount) public onlyAllowed {
        decreaseBalance(_to, _amount);
        token.safeTransfer(_target, _amount);
    }

    function increaseBalance(address _target, uint256 _amount) private {
        copyrighters[_target].balance += _amount;
    }

    function decreaseBalance(address _target, uint256 _amount) private {
        require(copyrighters[_target].ableCopyrighter, "You are not Copyrighter");
        require(copyrighters[_target].balance >= _amount, "You can't withdraw the money");
        copyrighters[_target].balance -= _amount;
    }

    function balanceOf(address _target) public view returns (uint256) {
        return copyrighters[_target].balance;
    }
}