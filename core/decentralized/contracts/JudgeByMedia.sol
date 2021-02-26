// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
import './compensate/Compensate.sol';
import './events/JudgeEvents.sol';

/**
 *@title JudgeByMedia
 *@author  Wanggyu, Suh
 *@notice Judge reports and compensate each report
 */
contract JudgeByMedia is Compensate, JudgeEvents{
    using Report for Report.Link;
    using Report for bytes32;

    constructor() public {
        developerAddress = msg.sender;
    }

    function holdDatabase(ReportData _reportStorage, InspectData _inspertorStorage, DefendeeData _defendeeStorage) public onlyDeveloper {
        reportStorage = _reportStorage;
        inspertorStorage = _inspertorStorage;
        defendeeStorage = _defendeeStorage;
    }

    function registerCopyrighter(bytes32 _name) public {
        defendeeStorage.setCopyrighter(msg.sender, _name);
        emit RegisterCopyrighter(_name, msg.sender);
    }

     /**
       @dev DefendContract.registerDefendee(name, amount,{ value : amount} )
       This function register a defended target with compensation money for
       fee that reporter and inspector pay to ethereum network.
       It will can't compensate all of their fee and not to everyone who inspect or report,
       But, It can help to activate this service.
    */
    function registerDefendee(
        bytes32 _name,
        uint256 _pendingEth,
        uint256 _rewardAmount,
        uint8 _inspectCount
    )
        public payable returns (bool)
    {
        /* Please make same even if different judge contract */
        require(_pendingEth == msg.value,"Please send Eth correctly");

        if(defendeeStorage.getDefendeeOwnerAddress(_name) == address(0))
            require(msg.value >= 0.2 ether,"Send more than 0.2 ether");
        else
            require(msg.value >= 2 ether, "Send more than 2.0 ether");

        while(!defendeeStorage.getCompensationIsEmpty())
            compensateFee();
        defendeeStorage.setDefendee(msg.sender, _name, msg.value, _rewardAmount, _inspectCount);
        emit RegisterDefendee(_name, _pendingEth, _rewardAmount, _inspectCount,defendeeStorage.getDefendeeRate(_name),msg.sender);
        return true;
    }

    function deleteDefendee(bytes32 _defendeeName) public {
        defendeeStorage.deleteDefendee(_defendeeName, msg.sender);
    }

    function addIPToBlackList(bytes32 _ip, bytes32 _defendeeName) public {
        defendeeStorage.addIPToBlackList(_ip, _defendeeName);
    }

    function addIPtoWhiteList(bytes32 _ip, bytes32 _defendeeName) public {
        defendeeStorage.addIPtoWhiteList(_ip, _defendeeName, msg.sender);
    }

    function changeModeOfDefendee(bytes32 _defendeeName, uint8 _mode) public {
        defendeeStorage.changeMode(_defendeeName, msg.sender, _mode);
    }

    function judge(bytes memory _domain, bytes32 _defendeeName, bool _decision) public {
        bytes32 meta = _defendeeName.makeMetaDataForLink(_domain);

        require(defendeeStorage.getAbleCopyrighters(msg.sender), "You can't judge the defendee");
        require(defendeeStorage.getDefendeeOwnerAddress(_defendeeName) == msg.sender, "You can't decide that defendee report");
        require(!reportStorage.getReportDisabled(meta), "It is already judge");
        require(reportStorage.getStep(meta) == 2, "Please inpect first!");
        if(_decision) {
            reportStorage.setReportJudge(meta, true);
            approveReport(meta, _defendeeName);
        } else {
            reportStorage.setReportJudge(meta, false);
            denyReport(meta);
            decreaseRateDefendee(_defendeeName);
        }
        defendeeStorage.setUnjudged(_defendeeName, false, msg.sender);
        emit Judge(_domain, _defendeeName, _decision);
    }

    function approveReport(bytes32 _meta, bytes32 _defendeeName) private {
        compensateReport(_meta, _defendeeName);
        defendeeStorage.compenSationQueueEnqueue(_meta);
        while(!defendeeStorage.getCompensationIsEmpty())
            compensateFee();

    }

    /* @dev 신고의 거부는 저작물의 평점을 낮추고, 이 낮춘 평점을 통해, 저작물은
     * 낮은 결과를 얻게 됩니다.
     */
    function denyReport(bytes32 _meta) private {
        uint8 num = reportStorage.getNumberOfInspector(_meta);
        defendeeStorage.compenSationQueueEnqueue(_meta);
        for(uint8 i = 0; i < num; i++){
            address targetAddress = reportStorage.getInspectorAddress(_meta, i);
            if(reportStorage.getInspectDecision(_meta, targetAddress) == true) {
                decreaseRate(targetAddress);
            } else {
                increaseRate(targetAddress);
            }
        }
    }
}