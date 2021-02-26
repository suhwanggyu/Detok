// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
import '../library/Report.sol';
import '../token/DetokToken.sol';
import '../library/Queue.sol';
import '../library/ObjStruct.sol';
import '../math/SafeMathuint.sol';
import "../../node_modules/openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "../wallet/Wallet.sol";
/**
 *@title DefendeeData
 *@author  Wanggyu, Suh
 *@notice Save data about copyright
 */
contract DefendeeData is Wallet{
    mapping (bytes32 => ObjStruct.Defendee) public defendees;
    Queue compenSationQueue;
    uint16 constant public MAX_RATE_DEFENDEE = 65535;
    uint16 constant public START_RATE_DEFENDEE = 10000;
    uint16 constant public MIN_RATE_DEFENDEE = 5000;
    uint16 constant RATE_INTERVAL_PLATFORM = 800;

    constructor(address _noticeAddress, address _inspectAddress, address _judgeAddress, DetokToken _token) public{
        compenSationQueue = new Queue(address(this));
        allowedAddress[_noticeAddress] = true;
        allowedAddress[_inspectAddress] = true;
        allowedAddress[_judgeAddress] = true;
        token = _token;
    }

    modifier onlyDefendeeOwner(bytes32 _defendeeName, address _target) {
        require(defendees[_defendeeName].ableNotify, "It isn't register");
        require(defendees[_defendeeName].rightOwnerAddress == _target, "You aren't owner");
        _;
    }

    /* Getter function */
    function getAbleCopyrighters(address _target) public view returns (bool) {
        return copyrighters[_target].ableCopyrighter;
    }
    function getCompensationIsEmpty() public view returns (bool){
        return compenSationQueue.isEmpty();
    }

    function getDefendeeAble(bytes32 _defendeeName) public view returns (bool) {
        return defendees[_defendeeName].ableNotify;
    }

    function getDefendeeOwnerAddress(bytes32 _defendeeName) public view returns (address) {
        return defendees[_defendeeName].rightOwnerAddress;
    }

    function getRewardAmount(bytes32 _defendeeName) public view returns (uint256) {
        return defendees[_defendeeName].rewardAmount;
    }

    function getMode(bytes32 _defendeeName) public view returns (uint8) {
        return defendees[_defendeeName].mode;
    }

    function checkWhiteList(bytes32 _defendeeName, bytes32 _ip) public view returns (bool) {
        return defendees[_defendeeName].whiteListIP[_ip];
    }

    function getInspectCount(bytes32 _defendeeName) public view returns (uint8) {
        return defendees[_defendeeName].inspectCount;
    }

    function getDefendeeRate(bytes32 _defendeeName) public view returns (uint16) {
        return defendees[_defendeeName].rate;
    }
    
    function getUnjudged(bytes32 _defendeeName) public view returns (uint16) {
        return defendees[_defendeeName].unJudged;
    }

    /* Setter function */
    function compenSationQueueEnqueue(bytes32 _meta) public onlyAllowed {
        compenSationQueue.enqueue(_meta);
    }

    function compenSationQueueDequeue() public onlyAllowed returns (bytes32) {
        return compenSationQueue.dequeue();
    }

    function changeMode(bytes32 _defendeeName, address _target, uint8 _mode)
        public
        onlyAllowed
        onlyDefendeeOwner(_defendeeName, _target)
    {
        require(defendees[_defendeeName].rightOwnerAddress == _target, "please owner");
        defendees[_defendeeName].mode = _mode;
    }

    function setCopyrighter(address _target, bytes32 _name) public onlyAllowed {
        require(!getAbleCopyrighters(_target), "Already Register!");
        copyrighters[_target] = ObjStruct.Copyrighter(_name, true, 0);
    }

    function setDefendee(
        address payable _rightOwnerAddress,
        bytes32 _name,
        uint256 _pendingEth,
        uint256 _rewardAmount,
        uint8 _inspectCount

    )
        public onlyAllowed
    {
        require(copyrighters[_rightOwnerAddress].ableCopyrighter == true, "Register your wallet first");
        require(
            defendees[_name].ableNotify == false || _pendingEth > defendees[_name].pendingEth,
            "Already registered defendee. Just add you to the defendee."
        );
        require(_rewardAmount >= 10**19, "please set reward more than 10 tokens");
        require(_inspectCount > 0, "Need more than 1 inspector");
        defendees[_name] = ObjStruct.Defendee(
            _rightOwnerAddress,
            _name,
            true,
            _pendingEth,
            _rewardAmount,
            _inspectCount,
            0,
            START_RATE_DEFENDEE + uint16(_pendingEth / 0.1 ether * RATE_INTERVAL_PLATFORM),
            0
        );
    }

    function deleteDefendee(
        bytes32 _defendeeName,
        address _target
    )
        public
        onlyAllowed
        onlyDefendeeOwner(_defendeeName, _target)
        returns (bool)
    {
        require(defendees[_defendeeName].ableNotify == true, "It isn't register");
        defendees[_defendeeName].ableNotify = false;
        return true;
    }

    /* BlackList Procedure : Check it before judge */
    function addIPToBlackList(bytes32 _ip, bytes32 _defendeeName)
        public
        onlyAllowed
    {
        require(defendees[_defendeeName].blackListIP[_ip] == false, "Already in BlackList");
        defendees[_defendeeName].blackListIP[_ip] = true;
    }

    function addIPtoWhiteList(bytes32 _ip, bytes32 _defendeeName, address _target)
        public
        onlyAllowed
        onlyDefendeeOwner(_defendeeName, _target)
    {
        require(defendees[_defendeeName].whiteListIP[_ip], "Already in whiteListIP");
        defendees[_defendeeName].whiteListIP[_ip] = true;
    }

    function checkBlackList(bytes32 _ip, bytes32 _defendeeName) public view returns (bool) {

        return defendees[_defendeeName].blackListIP[_ip];
    }

    function checkIPWhiteList(bytes32 _ip, bytes32 _defendeeName) public view returns (bool) {
        return defendees[_defendeeName].whiteListIP[_ip];
    }

    function setDefendeeRate(bytes32 _defendeeName, bool winning, address _target)
        public
        onlyAllowed
        onlyDefendeeOwner(_defendeeName, _target)
    {
        if (winning) {
            uint16 c = defendees[_defendeeName].rate + RATE_INTERVAL_PLATFORM;
            if (c >= defendees[_defendeeName].rate){
                defendees[_defendeeName].rate = c;
            } else {
                defendees[_defendeeName].rate = MAX_RATE_DEFENDEE;
            }
        } else {
            defendees[_defendeeName].rate -= RATE_INTERVAL_PLATFORM * 2;
            if (defendees[_defendeeName].rate < MIN_RATE_DEFENDEE ) {
                deleteDefendee(_defendeeName, _target);
            }
        }
    }
    
    function setUnjudged(bytes32 _defendeeName, bool _direct, address _target) public onlyAllowed {
        if (_direct) {
            uint16 num = ++defendees[_defendeeName].unJudged;
            if ((defendees[_defendeeName].pendingEth / 0.02 ether) <= num) {
                setDefendeeRate(_defendeeName, false, _target);
            }
        } else {
            defendees[_defendeeName].unJudged--;
        }
    }
}