// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

import './storeContract/ReportData.sol';
import './storeContract/DefendeeData.sol';
import './events/NoticeEvents.sol';

/**
 *@title Notify
 *@author Wanggyu, Suh
 *@notice Report illegal links
 */
contract Notify is NoticeEvents{
    using Report for bytes32;
    /* Storage Contract of report and defendees
       It helps Defender being DAO
    */
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

    modifier onlyNotInBlackList(bytes32 _defendeeName, bytes32 _ip) {
        /* TODO : 블랙리스트 아이피에 해당하면 실행하지 않는 것을 만든다. */
        _;
    }

    /* Hold database for notify */
    function holdDatabase(ReportData _reportStorage, DefendeeData _defendeeStorage) public onlyDeveloper {
        reportStorage = _reportStorage;
        defendeeStorage = _defendeeStorage;
    }

    /**
     *@dev mode0 : prevent only redundant domain
      mode1 : only take white list ip
      mode2 : only take not in blacklist ip
     */
    function notifyHandler(
        bytes memory _domain,
        bytes32 _defendeeName,
        bytes32 _ip
    )
        public onlyNotInBlackList(_defendeeName, _ip)
    {
        uint256 startGas = gasleft();
        bytes32 meta = _defendeeName.makeMetaDataForLink(_domain);
        /* TODO : prevent self report?  maybe better way is not on chain*/
        require(defendeeStorage.getDefendeeAble(_defendeeName) == true, "You can't report about this multimedia");
        require(reportStorage.getReporterAddress(meta) == address(0),"Already Report");
        uint8 mode = defendeeStorage.getMode(_defendeeName);
        if (mode == 0)
            reportStorage.setReport(_domain, _defendeeName, msg.sender, _ip);
        else if (mode == 1){
            require(defendeeStorage.checkWhiteList(_ip, _defendeeName), "It is not noticable ip");
            reportStorage.setReport(_domain, _defendeeName, msg.sender, _ip);
        }
        else if (mode == 2){
            /* TODO : 한번 들어온 IP 대역 안 받는 모드 생성하기 */
            require(defendeeStorage.checkBlackList(_ip, _defendeeName)==false, "It is Black");
            reportStorage.setReport(_domain, _defendeeName, msg.sender, _ip);
            defendeeStorage.addIPToBlackList(_ip, _defendeeName);
            emit addingBlackList(_defendeeName, _ip, msg.sender);
        }
        emit Reporting(_domain, _defendeeName, _ip, msg.sender);
        uint256 usedFee = (startGas - gasleft()) * tx.gasprice;
        reportStorage.setReportFee(meta,usedFee);
    }
}