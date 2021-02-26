// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;
import './math/SafeMathuint.sol';
import './storeContract/ReportData.sol';
import './storeContract/InspectData.sol';
import './storeContract/DefendeeData.sol';
import './rate/RateInspector.sol';
import './events/InspectEvents.sol';

/**
 *@title Inspect
 *@author  Wanggyu, Suh
 *@notice Inspect a report or register inspector
 *@dev It will be reconstruct because it is prototype.
  It works well, but it take large amount of fee for reducing fee
  For reduce fee, Alpha version will delete exception handling that can be controlled in out of blockchain
 */
contract Inspect is RateInspector, InspectEvents {
    using Report for bytes32;
    using SafeMathuint for uint16;
    ReportData reportStorage;
    DefendeeData defendeeStorage;
    address developer;

    constructor() public {
        developer = msg.sender;
    }

    modifier onlyDeveloper() {
        require(msg.sender == developer, "Only for developer");
        _;
    }

    function holdDatabase(ReportData _reportStorage, InspectData _inspertorStorage, DefendeeData _defendeeStorage) public onlyDeveloper {
        reportStorage = _reportStorage;
        inspertorStorage = _inspertorStorage;
        defendeeStorage = _defendeeStorage;
    }
    //@notice The user who call this function be a inspector
    function registerInspector() public returns (bool) {

        require(!inspertorStorage.getAbled(msg.sender), "Already registered");
        require(inspertorStorage.getRate(msg.sender) == 0, "You are blacked inspector");
        inspertorStorage.setInspector(msg.sender);
        emit RegisterInspector(msg.sender);
        return true;
    }
    /**
     *@param _domain domain of target report
     *@param _defendeeName copyright's name of target report
     *@param _decision Inspector's decision of target report
     */
    function inspect(
        bytes memory _domain,
        bytes32 _defendeeName,
        bool _decision
    )
        public
    {
        uint256 startGas = gasleft();
        bytes32 meta = _defendeeName.makeMetaDataForLink(_domain);

        /* Check condition
            1. 자신이 신고한 것에 검증 못하게 막는다.
            2. 검증자로 등록이 되어 있는 지 확인한다.
            3. 해당 신고에 검증한 적이 있는 지 확인한다.
            4. 해당 신고가 검증 단계의 신고가 맞는지 확인한다.
         */
        (address test,bool test2,uint8 test3) = reportStorage.metaDataForOnce(meta, msg.sender);
        require(test != msg.sender, "Don't Try to inspect your report");
        require(test2 == false, "Already inspect");
        require(test3 == 1,"Already finish inspecting report");
        require(inspertorStorage.getAbled(msg.sender) == true, "Please Register First");

        uint16 approveCount;
        uint16 denyCount;
        uint8 inspectCount = defendeeStorage.getInspectCount(_defendeeName);
        (approveCount, denyCount) = reportStorage.setReportInspectCount(meta, _decision, msg.sender);

        if(approveCount.add(denyCount) >= inspectCount && approveCount > denyCount){
            reportStorage.setInspect(meta, true);
            address owner = defendeeStorage.getDefendeeOwnerAddress(_defendeeName);
            defendeeStorage.setUnjudged(_defendeeName, true, owner);
        } else if (approveCount.add(denyCount) >= inspectCount && approveCount < denyCount) {
            reportStorage.setInspect(meta, false);
            defendeeStorage.compenSationQueueEnqueue(meta);
            uint8 number = reportStorage.getNumberOfInspector(meta);
            for (uint8 i = 0; i < number; i++) {
                address target = reportStorage.getInspectorAddress(meta, i);
                if(reportStorage.getInspectDecision(meta,target)){
                    increaseRateForDenySecond(target);
                } else {
                    decreaseRateForDenySecond(target);
                }
            }
        }
        uint256 usedFee = (startGas - gasleft()) * tx.gasprice;
        /**
         *@dev
            This is prototype.
            Refund amount is not accurately measure
            It will be changed with accurate measurement.
        */
        reportStorage.setReportInspectGas(meta, usedFee + 1000000000000000);
        emit Inspect(msg.sender, _decision, _domain, _defendeeName);
    }
}