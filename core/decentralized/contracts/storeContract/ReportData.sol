// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

import '../library/Report.sol';
import '../library/Queue.sol';
import '../library/ObjStruct.sol';
/**
 *@title InspectData
 *@author  Wanggyu, Suh
 *@notice Save data about report
 */
contract ReportData{
    using Report for bytes32;

    mapping(bytes32 => Report.Link) public reports;
    mapping(address => bool) allowedAddress;
    constructor(address _noticeAddress, address _inspectAddress, address _judgeAddress) public{

        allowedAddress[_noticeAddress] = true;
        allowedAddress[_inspectAddress] = true;
        allowedAddress[_judgeAddress] = true;
    }

    modifier onlyAllowed(){
        require(allowedAddress[msg.sender] = true,"Only allowed contract can access");
        _;
    }

    function getMeta(bytes memory _domain, bytes32 _defendeeName) public pure returns (bytes32){
        return _defendeeName.makeMetaDataForLink(_domain);
    }
    /* Getter function */
    function getIp(bytes32 _meta) public view returns (bytes32){
        return reports[_meta].ip;
    }
    function getReportDomain(bytes32 _meta) public view returns (bytes memory){
        return reports[_meta].domain;
    }

    function getInspectDecision(bytes32 _meta, address _target) public view returns (bool){
        return reports[_meta].inspectDecisions[_target].decision;
    }

    function getInspectorAddress(bytes32 _meta, uint8 _num) public view returns (address payable){
        return reports[_meta].listOfInspectors[_num];
    }

    function getNumberOfInspector(bytes32 _meta) public view returns (uint8){
        return reports[_meta].numberOfInspectors;
    }

    function getReportJudge(bytes32 _meta) public view returns (bool) {
        return reports[_meta].judge;
    }

    function getReportCheckInspect(bytes32 _meta, address _target) public view returns (bool) {
        return reports[_meta].inspectDecisions[_target].checkInspect;
    }

    function getReportDisabled(bytes32 _meta) public view returns (bool) {
        return reports[_meta].disabled;
    }

    function getReporterAddress(bytes32 _meta) public view returns (address payable) {
        return reports[_meta].reporterAddress;
    }

    function getInspectUsedFee(bytes32 _meta, uint8 _num) public view returns (uint256) {
        return reports[_meta].usedFee[_num];
    }

    function getInspect(bytes32 _meta) public view returns (bool) {
        return reports[_meta].inspect;
    }

    function getStep(bytes32 _meta) public view returns (uint8) {
        return reports[_meta].step;
    }

    function getReporterFee(bytes32 _meta) public view returns (uint256) {
        return reports[_meta].reporterFee;
    }

    function metaDataForOnce(bytes32 _meta, address _target) public view returns (address ,bool, uint8){
        return (reports[_meta].reporterAddress, reports[_meta].inspectDecisions[_target].checkInspect, reports[_meta].step);
    }
    /* Setter function */
    function setReport(
        bytes memory _domain,
        bytes32 _defendeeName,
        address payable _msgSender,
        bytes32 _ip
    )
        public onlyAllowed
        returns (bool)
    {
        bytes32 meta = _defendeeName.makeMetaDataForLink(_domain);
        reports[meta] = Report.makeNewLink(_domain, _defendeeName, _msgSender, _ip);
    }

    function setReportInspectCount(bytes32 _meta, bool _decision, address payable _msgSender) public onlyAllowed returns (uint16, uint16){
        reports[_meta].listOfInspectors[reports[_meta].numberOfInspectors] = _msgSender;
        reports[_meta].inspectDecisions[_msgSender] = Report.InspectorsDecision(_decision, true);
        reports[_meta].numberOfInspectors++;
        if (_decision)
            reports[_meta].inspectApprove++;
        else
            reports[_meta].inspectDeny++;

        return (reports[_meta].inspectApprove, reports[_meta].inspectDeny);
    }

    function setReportInspectGas(bytes32 _meta, uint256 _usedFee) public onlyAllowed {
        reports[_meta].usedFee[reports[_meta].numberOfInspectors - 1] = _usedFee;
    }

    function setReportJudge(bytes32 _meta, bool _decision) public onlyAllowed {
        reports[_meta].judge = _decision;
        reports[_meta].disabled = true;
        reports[_meta].step = 3;
    }

    function setInspect(bytes32 _meta, bool _decision) public onlyAllowed {
        reports[_meta].inspect = _decision;
        reports[_meta].disabled = (!_decision);
        reports[_meta].step = (!_decision? 4:2);
    }

    function setReportFee(bytes32 _meta, uint256 _fee) public onlyAllowed {
        reports[_meta].reporterFee = _fee;
    }
}