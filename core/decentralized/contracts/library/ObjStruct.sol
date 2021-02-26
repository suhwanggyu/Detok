// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

/**
 *@title ObjStruct
 *@author Wanggyu, Suh
 *@notice Struct libray
 */
library ObjStruct {

    struct Copyrighter {
        bytes32 name;
        bool ableCopyrighter;
        uint256 balance;
    }
    

    struct Defendee {
        address payable rightOwnerAddress;
        mapping(bytes32 => bool) blackListIP;
        mapping(bytes32 => bool) whiteListIP;
        bytes32 name;
        bool ableNotify;
        uint256 pendingEth;
        uint256 rewardAmount;
        uint8 inspectCount;
        uint8 mode;
        uint16 rate;
        uint16 unJudged;
    }

    struct Blower {
        address blowerAddress;
        uint16 rate;
        bool disabled;
    }

    struct Inspector {
        address InspectorAddress;
        uint16 rate;
        bool abled;
        uint16 winningStreak;
        bool winningState;
    }

}