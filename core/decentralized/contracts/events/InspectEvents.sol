// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

/**
 *@title InspectEvents
 *@author Wanggyu, Suh
 *@notice Event about inspect process
 */
contract InspectEvents {
    event Inspect(
        address inspector,
        bool decision,
        bytes domain,
        bytes32 defendeeName
    );

    event RegisterInspector(
        address inspector
    );
}