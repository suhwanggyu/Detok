// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
import '../TokenTaker.sol';
import '../rate/RateInspector.sol';
import '../rate/RateDefendee.sol';
import '../storeContract/ReportData.sol';
import "../../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";
/**
 *@title Compensate
 *@author Wanggyu, Suh
 *@notice Reward and compensate fee
 */
contract Compensate is TokenTaker, RateInspector, RateDefendee{
    using Report for bytes32;
    using SafeERC20 for DetokToken;
    using SafeMath for uint256;
    ReportData reportStorage;

    function compensateReport(bytes32 meta, bytes32 _defendeeName) internal {
        uint256 rewardAmount = defendeeStorage.getRewardAmount(_defendeeName);
        require(reportStorage.getReportJudge(meta) == true, "Try it only right judge!");
        require(token.balanceOf(msg.sender) >= rewardAmount, "You need to charge");

        uint256 reporterReward = rewardAmount.div(2);
        uint256 inspectorTotalReward = rewardAmount.sub(reporterReward);
        uint256 totalRate = 0;
        uint8 number = reportStorage.getNumberOfInspector(meta);
        for (uint8 i = 0; i < number; i++) {
            address target = reportStorage.getInspectorAddress(meta, i);
            if(reportStorage.getInspectDecision(meta,target))
                totalRate += getRate(target);
        }
        defendeeStorage.deposit(rewardAmount, msg.sender);
        require(reportStorage.getReporterAddress(meta) != address(0),"here!!!!!!");
        defendeeStorage.tokenTransfer(msg.sender, reportStorage.getReporterAddress(meta), reporterReward);
        for (uint8 i = 0; i < number; i++) {
            address target = reportStorage.getInspectorAddress(meta, i);
            require(target != address(0),"here!!!!!!");
            if (reportStorage.getInspectDecision(meta,target)) {
                uint256 reward = inspectorTotalReward/totalRate * getRate(target);
                defendeeStorage.tokenTransfer(msg.sender, target, reward);
                increaseRate(target);
            }
        }
        incrementRateDefendee(_defendeeName);
    }

    function compensateFee() internal {
        require(!defendeeStorage.getCompensationIsEmpty(),"No target of compensation");
        require(defendeeStorage.getAbleCopyrighters(msg.sender), "Please Register your address first");

        /* Dequeue first for prevent redundant withdraw by Checks-Effects-Interactions*/
        bytes32 meta = defendeeStorage.compenSationQueueDequeue();
        uint8 i = 0;
        uint8 number = reportStorage.getNumberOfInspector(meta);
        uint256 reportfee = reportStorage.getReporterFee(meta);
        if (address(this).balance > reportfee && reportStorage.getReportJudge(meta))
            reportStorage.getReporterAddress(meta).transfer(reportfee);
        for (i = 0; i < number; i++) {
            if (!reportStorage.getInspect(meta)) {
                address payable target = reportStorage.getInspectorAddress(meta, i);
                uint256 usedGas = reportStorage.getInspectUsedFee(meta, i);
                if (address(this).balance < usedGas) break;
                if (reportStorage.getInspectDecision(meta, target) == false)
                    target.transfer(usedGas);
            } else {
                address payable target = reportStorage.getInspectorAddress(meta, i);
                uint256 usedGas = reportStorage.getInspectUsedFee(meta, i);
                if (address(this).balance < usedGas) break;
                if (reportStorage.getInspectDecision(meta, target) == reportStorage.getReportJudge(meta))
                    target.transfer(usedGas);
            }
        }
    }
}