// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
import "./validation/TimedCrowdsale.sol";

contract DetokCrowdSale is TimedCrowdsale {

    constructor(
        uint256 rate,            // rate, in TKNbits
        address payable wallet,  // wallet to send Ether
        IERC20 token,            // the token                    // total cap, in wei
        uint256 openingTime,     // opening time in unix epoch seconds
        uint256 closingTime,
        uint256 cap      // closing time in unix epoch seconds
    )
        TimedCrowdsale(rate, wallet, token, openingTime, closingTime, cap)
        public
    {
        
        // nice, we just created a crowdsale that's only open
        // for a certain amount of time
        // and stops accepting contributions once it reaches `cap`
    }
}

