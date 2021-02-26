// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

/**
 *@title ObjStruct
 *@author Wanggyu, Suh
 *@notice For using compensate queue
 */
contract Queue {
    mapping(uint256 => bytes32) queue;
    uint256 first = 1;
    uint256 last = 0;
    mapping(address => bool) allowedAddress;

    constructor(
        address data
    )
        public
    {
        allowedAddress[data] = true;
    }

    modifier onlyAllowed(){
        require(allowedAddress[msg.sender] == true,"Only allowed contract can access");
        _;
    }

    function enqueue(bytes32 data) public {
        last += 1;
        queue[last] = data;
    }

    function dequeue() public onlyAllowed returns (bytes32 data){
        require(last >= first, "Don't try to delete from empty queue");
        data = queue[first];

        delete queue[first];
        first += 1;

    }

    function isEmpty() public view returns (bool){
        if(last + 1 == first) return true;
        return false;
    }
    
    function getNth(uint256 n) public view returns (bytes32 data){
        uint256 target = first + n - 1;
        require(target <= last,"Not enough that target");
        data = queue[target];
    }

    function length() public view returns (uint256){
        return ((last+1) - first);
    }
}