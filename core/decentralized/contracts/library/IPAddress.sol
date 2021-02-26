// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

/**
 *@dev Better way is control ip address at out of chain
 *It will be removed
 */
library IPAddress {
    struct IP {
        /* True : IPv4, False : IPv6 */
        bool family;
        bytes32 ip;
    }
}

