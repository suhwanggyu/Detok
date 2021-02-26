// SPDX-License-Identifier: MIT

pragma solidity >=0.4.21 <0.7.0;

import '../storeContract/InspectData.sol';
/**
 *@title RateInspector
 *@author  Wanggyu, Suh
 *@notice Connector with rating database contract
 */
contract RateInspector {
    InspectData inspertorStorage;
    
    function getRate(address _target) public view returns (uint16) {
        return inspertorStorage.getRate(_target);
    }

    function increaseRate(address _targetAddress) internal {
        inspertorStorage.setWinning(_targetAddress, true, false);
    }

    function decreaseRate(address _targetAddress) internal returns (bool) {
        inspertorStorage.setWinning(_targetAddress, false, false);
    }

    function increaseRateForDenySecond(address _targetAddress) internal {
        inspertorStorage.setWinning(_targetAddress, true, true);
    }

    function decreaseRateForDenySecond(address _targetAddress) internal {
        inspertorStorage.setWinning(_targetAddress, false, true);
    }
}