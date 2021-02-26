// SPDX-License-Identifier: MIT

pragma solidity >=0.4.21 <0.7.0;


library SafeMathuint {
    
    function add(uint16 a, uint16 b) internal pure returns (uint16) {
        uint16 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }
    
    function sub(uint16 a, uint16 b) internal pure returns (uint16) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }
    
    function sub(uint16 a, uint16 b, string memory errorMessage) internal pure returns (uint16) {
        require(b <= a, errorMessage);
        uint16 c = a - b;

        return c;
    }
    
    function mul(uint16 a, uint16 b) internal pure returns (uint16) {
        
        if (a == 0) {
            return 0;
        }

        uint16 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }
    
    function div(uint16 a, uint16 b) internal pure returns (uint16) {
        return div(a, b, "SafeMath: division by zero");
    }

    function div(uint16 a, uint16 b, string memory errorMessage) internal pure returns (uint16) {
        require(b > 0, errorMessage);
        uint16 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }
    
    function mod(uint16 a, uint16 b) internal pure returns (uint16) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    function mod(uint16 a, uint16 b, string memory errorMessage) internal pure returns (uint16) {
        require(b != 0, errorMessage);
        return a % b;
    }
}
