// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
import '../library/Report.sol';
import '../math/SafeMathuint.sol';
import '../library/ObjStruct.sol';

/**
 *@title InspectData
 *@author  Wanggyu, Suh
 *@notice Save data about inspector
 */
contract InspectData {
    using SafeMathuint for uint16;
    mapping (address => ObjStruct.Inspector) inspectors;
    uint16 constant public MAX_RATE_INSPECT = 65535;
    uint16 constant public MIN_RATE_INSPECT = 10000;
    uint16 constant RATE_INTERVAL = 500;

    mapping(address => bool) allowedAddress;
    constructor(
        address _noticeAddress,
        address _inspectAddress,
        address _judgeAddress
    )
        public
    {
        allowedAddress[_noticeAddress] = true;
        allowedAddress[_inspectAddress] = true;
        allowedAddress[_judgeAddress] = true;
    }


    modifier onlyAllowed(){
        require(allowedAddress[msg.sender] = true,"Only allowed contract can access");
        _;
    }
    /* Getter function */
    function getAbled(address _target) public view returns (bool) {
        return inspectors[_target].abled;
    }

    function getRate(address _target) public view returns (uint16) {
        return inspectors[_target].rate;
    }

    function getWinningStreak(address _target) public view returns (uint16) {
        return inspectors[_target].winningStreak;
    }
    function getWinningState(address _target) public view returns (bool) {
        return inspectors[_target].winningState;
    }

    /* Setter function */
    function setInspector(address _target) public onlyAllowed {
        inspectors[_target] = ObjStruct.Inspector(msg.sender, MAX_RATE_INSPECT/3, true, 0, true);
    }

    function setWinning(address _target, bool _result, bool _second) public onlyAllowed {
        if (_second) {
            if(_result){
                uint16 rate = inspectors[_target].rate;
                uint16 c = rate + RATE_INTERVAL;
                if (c >= rate)
                    inspectors[_target].rate = c;
                else
                    inspectors[_target].rate = MAX_RATE_INSPECT;
            } else {
                if (inspectors[_target].winningState) {
                inspectors[_target].winningState = false;
                inspectors[_target].winningStreak = 0;
                } else {
                    uint16 rate = inspectors[_target].rate;
                    inspectors[_target].winningStreak = inspectors[_target].winningStreak + 2;
                    uint16 c = rate - inspectors[_target].winningStreak.mul(RATE_INTERVAL);
                    if(rate > c)
                        inspectors[_target].rate = c;
                    else
                        inspectors[_target].rate = 0;
                    decideKeepRole(_target);
                }
            }
        } else if (_result) {
            if (!inspectors[_target].winningState) {
                inspectors[_target].winningState = true;
                inspectors[_target].winningStreak = 0;
            } else {
                uint16 rate = inspectors[_target].rate;
                inspectors[_target].winningStreak++;
                uint16 c = rate + inspectors[_target].winningStreak.mul(RATE_INTERVAL);
                if (c >= rate)
                    inspectors[_target].rate = c;
                else
                    inspectors[_target].rate = MAX_RATE_INSPECT;
            }
        } else {
            if (inspectors[_target].winningState) {
                inspectors[_target].winningState = false;
                inspectors[_target].winningStreak = 0;
            } else {
                uint16 rate = inspectors[_target].rate;
                inspectors[_target].winningStreak = inspectors[_target].winningStreak + 2;
                uint16 c = rate - inspectors[_target].winningStreak.mul(RATE_INTERVAL);
                if(rate > c)
                    inspectors[_target].rate = c;
                else
                    inspectors[_target].rate = 0;
                decideKeepRole(_target);
            }
        }
    }

    function decideKeepRole(address _target) internal returns (bool) {
        require(inspectors[_target].abled == true, "Not registered Inspector");
        if (inspectors[_target].rate <= MIN_RATE_INSPECT) {
            inspectors[_target].abled = false;
            return false;
        }
        return true;
    }
}