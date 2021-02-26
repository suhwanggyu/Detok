// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
import '../math/SafeMathuint.sol';
import '../storeContract/DefendeeData.sol';
/**
 *@title RateDefendee
 *@author  Wanggyu, Suh
 *@notice Connector with rate database contract
 */
contract RateDefendee {
    using SafeMathuint for uint16;
    DefendeeData defendeeStorage;
   
    function getRateDefendee(bytes32 _defendeeName) public view returns (uint16) {
        return defendeeStorage.getDefendeeRate(_defendeeName);
    }

    function incrementRateDefendee(bytes32 _defendeeName) internal {
        defendeeStorage.setDefendeeRate(_defendeeName, true, msg.sender);
    }

    function decreaseRateDefendee(bytes32 _defendeeName) internal {
        defendeeStorage.setDefendeeRate(_defendeeName, false, msg.sender);
    }
}