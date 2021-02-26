// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
/**
 *@title JudgeEvents
 *@author Wanggyu, Suh
 *@notice Event about Report process
 */
contract NoticeEvents {
    event Reporting(
        bytes domain,
        bytes32 defendeeName,
        bytes32 ip,
        address reporterAddress
    );
    
    event addingBlackList(
        bytes32 defendeeName,
        bytes32 ip,
        address reporterAddress
    );
}