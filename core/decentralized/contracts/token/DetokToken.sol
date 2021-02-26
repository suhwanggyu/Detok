// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

import '../../node_modules/openzeppelin-solidity/contracts/presets/ERC20PresetMinterPauser.sol';
import '../../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';

contract DetokToken is ERC20PresetMinterPauser{

    constructor() public ERC20PresetMinterPauser("Detok", "DTK") {
        _mint(msg.sender, 10**28);
    }
}