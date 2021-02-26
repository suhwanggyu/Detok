// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "./token/DetokToken.sol";
/* 
    This is for the Contract that wants to be role of Ethereum wallet.

 */
contract TokenTaker {
    using SafeERC20 for DetokToken;
    DetokToken public token;
    address developerAddress;
    
    /* TODO : It will be change by token holder voting */
    modifier onlyDeveloper() {
        require(developerAddress == msg.sender, "This function can be only executed by contract developer");
        _;
    }

    function holdToken(DetokToken _token) public onlyDeveloper {
        token = _token;
    }
}