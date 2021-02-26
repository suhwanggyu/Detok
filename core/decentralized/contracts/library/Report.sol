// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

/**
 *@title ObjStruct
 *@author Wanggyu, Suh
 *@notice Report library
 */
library Report {
    struct InspectorsDecision{
        bool decision;
        bool checkInspect;
    }

    struct LinkMetaData{
        bytes32 name;
        bytes32 domain;
    }

    struct Link{
        bytes domain;
        bytes32 defendeeName;
        uint16 inspectApprove;
        uint16 inspectDeny;
        bool judge;
        bool inspect;
        bool disabled;
        uint8 step;
        bytes32 ip;
        address payable reporterAddress;
        mapping(address => InspectorsDecision) inspectDecisions;
        mapping(uint8 => address payable) listOfInspectors;
        uint8 numberOfInspectors;
        mapping(uint8 => uint256) usedFee;
        uint256 reporterFee;
    }
    /* TODO : domain will type bytes -> bytes32 */
    function makeMetaDataForLink(bytes32 _name, bytes memory _domain) internal pure returns (bytes32){
        bytes32 domain = keccak256(_domain);
        bytes memory result = new bytes(64);
        bytes memory tmp = new bytes(32);
        assembly{
            mstore(add(tmp, 32), _name)
        }
        bytes32 name = keccak256(tmp);
        assembly{
            mstore(add(result, 32), name)
            mstore(add(result, 64), domain)
        }
        return keccak256(result);
    }

    function checkReInspect(address target, mapping(address => bool) storage list) internal view returns (bool){
        return list[target];
    }

    function makeNewLink
    (
        bytes memory _domain,
        bytes32 _defendeeName,
        address payable msgsender,
        bytes32 _ip
    )
        internal pure returns (Link memory)
    {
        return Link({
            domain:_domain,
            defendeeName:_defendeeName,
            disabled:false,
            reporterAddress:msgsender,
            inspectApprove:0,
            inspectDeny:0,
            ip:_ip,
            judge:false,
            numberOfInspectors:0,
            inspect:false,
            step:1,
            reporterFee:0
        });
    }

    function checkBlackList(bytes memory _list, bytes memory _target) internal pure returns (bool){
        uint256 blackLength = _list.length;

        for (uint256 i = 0; i < blackLength; i++) {
            if ( _list[i]^_target[i]=='1')
                return false;
        }
        return true;
    }
}