// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
/**
 *@title JudgeEvents
 *@author Wanggyu, Suh
 *@notice Event about Judge process
 */
contract JudgeEvents {
    event RegisterCopyrighter(
        bytes32 name,
        address copyrighter
    );

    event RegisterDefendee(
        bytes32 name,
        uint256 pendingEth,
        uint256 rewardAmount,
        uint8 inspectCount,
        uint16 rating,
        address copyrighterAddress
    );

    event Judge(
        bytes domain,
        bytes32 defendeeName,
        bool decision
    );
}