API
===

<br/>

# SafeMathuint
## add

**Parameters:**
* a `uint16`
* b `uint16`

**Return Parameters:**
* `uint16`
## sub

**Parameters:**
* a `uint16`
* b `uint16`

**Return Parameters:**
* `uint16`
## sub

**Parameters:**
* a `uint16`
* b `uint16`
* errorMessage `string`

**Return Parameters:**
* `uint16`
## mul

**Parameters:**
* a `uint16`
* b `uint16`

**Return Parameters:**
* `uint16`
## div

**Parameters:**
* a `uint16`
* b `uint16`

**Return Parameters:**
* `uint16`
## div

**Parameters:**
* a `uint16`
* b `uint16`
* errorMessage `string`

**Return Parameters:**
* `uint16`
## mod

**Parameters:**
* a `uint16`
* b `uint16`

**Return Parameters:**
* `uint16`
## mod

**Parameters:**
* a `uint16`
* b `uint16`
* errorMessage `string`

**Return Parameters:**
* `uint16`


<br/><br/>

# ReportData
*InspectData*
## constructor

**Parameters:**
* _noticeAddress `address`
* _inspectAddress `address`
* _judgeAddress `address`

## getMeta

**Parameters:**
* _domain `bytes`
* _defendeeName `bytes32`

**Return Parameters:**
* `bytes32`
## getIp

**Parameters:**
* _meta `bytes32`

**Return Parameters:**
* `bytes32`
## getReportDomain

**Parameters:**
* _meta `bytes32`

**Return Parameters:**
* `bytes`
## getInspectDecision

**Parameters:**
* _meta `bytes32`
* _target `address`

**Return Parameters:**
* `bool`
## getInspectorAddress

**Parameters:**
* _meta `bytes32`
* _num `uint8`

**Return Parameters:**
* `address`
## getNumberOfInspector

**Parameters:**
* _meta `bytes32`

**Return Parameters:**
* `uint8`
## getReportJudge

**Parameters:**
* _meta `bytes32`

**Return Parameters:**
* `bool`
## getReportCheckInspect

**Parameters:**
* _meta `bytes32`
* _target `address`

**Return Parameters:**
* `bool`
## getReportDisabled

**Parameters:**
* _meta `bytes32`

**Return Parameters:**
* `bool`
## getReporterAddress

**Parameters:**
* _meta `bytes32`

**Return Parameters:**
* `address`
## getInspectUsedFee

**Parameters:**
* _meta `bytes32`
* _num `uint8`

**Return Parameters:**
* `uint256`
## getInspect

**Parameters:**
* _meta `bytes32`

**Return Parameters:**
* `bool`
## getStep

**Parameters:**
* _meta `bytes32`

**Return Parameters:**
* `uint8`
## getReporterFee

**Parameters:**
* _meta `bytes32`

**Return Parameters:**
* `uint256`
## metaDataForOnce

**Parameters:**
* _meta `bytes32`
* _target `address`

**Return Parameters:**
* `address`
* `bool`
* `uint8`
## setReport

**Parameters:**
* _domain `bytes`
* _defendeeName `bytes32`
* _msgSender `address`
* _ip `bytes32`

**Return Parameters:**
* `bool`
## setReportInspectCount

**Parameters:**
* _meta `bytes32`
* _decision `bool`
* _msgSender `address`

**Return Parameters:**
* `uint16`
* `uint16`
## setReportInspectGas

**Parameters:**
* _meta `bytes32`
* _usedFee `uint256`

## setReportJudge

**Parameters:**
* _meta `bytes32`
* _decision `bool`

## setInspect

**Parameters:**
* _meta `bytes32`
* _decision `bool`

## setReportFee

**Parameters:**
* _meta `bytes32`
* _fee `uint256`

<br/><br/>

# DetokToken
## constructor

<br/><br/>

# DefendeeData
*DefendeeData*
## constructor

**Parameters:**
* _noticeAddress `address`
* _inspectAddress `address`
* _judgeAddress `address`
* _token `DetokToken`

## getAbleCopyrighters

**Parameters:**
* _target `address`

**Return Parameters:**
* `bool`
## getCompensationIsEmpty
**Return Parameters:**
* `bool`
## getDefendeeAble

**Parameters:**
* _defendeeName `bytes32`

**Return Parameters:**
* `bool`
## getDefendeeOwnerAddress

**Parameters:**
* _defendeeName `bytes32`

**Return Parameters:**
* `address`
## getRewardAmount

**Parameters:**
* _defendeeName `bytes32`

**Return Parameters:**
* `uint256`
## getMode

**Parameters:**
* _defendeeName `bytes32`

**Return Parameters:**
* `uint8`
## checkWhiteList

**Parameters:**
* _defendeeName `bytes32`
* _ip `bytes32`

**Return Parameters:**
* `bool`
## getInspectCount

**Parameters:**
* _defendeeName `bytes32`

**Return Parameters:**
* `uint8`
## getDefendeeRate

**Parameters:**
* _defendeeName `bytes32`

**Return Parameters:**
* `uint16`
## getUnjudged

**Parameters:**
* _defendeeName `bytes32`

**Return Parameters:**
* `uint16`
## compenSationQueueEnqueue

**Parameters:**
* _meta `bytes32`

## compenSationQueueDequeue
**Return Parameters:**
* `bytes32`
## changeMode

**Parameters:**
* _defendeeName `bytes32`
* _target `address`
* _mode `uint8`

## setCopyrighter

**Parameters:**
* _target `address`
* _name `bytes32`

## setDefendee

**Parameters:**
* _rightOwnerAddress `address`
* _name `bytes32`
* _pendingEth `uint256`
* _rewardAmount `uint256`
* _inspectCount `uint8`

## deleteDefendee

**Parameters:**
* _defendeeName `bytes32`
* _target `address`

**Return Parameters:**
* `bool`
## addIPToBlackList

**Parameters:**
* _ip `bytes32`
* _defendeeName `bytes32`

## addIPtoWhiteList

**Parameters:**
* _ip `bytes32`
* _defendeeName `bytes32`
* _target `address`

## checkBlackList

**Parameters:**
* _ip `bytes32`
* _defendeeName `bytes32`

**Return Parameters:**
* `bool`
## checkIPWhiteList

**Parameters:**
* _ip `bytes32`
* _defendeeName `bytes32`

**Return Parameters:**
* `bool`
## setDefendeeRate

**Parameters:**
* _defendeeName `bytes32`
* winning `bool`
* _target `address`

## setUnjudged

**Parameters:**
* _defendeeName `bytes32`
* _direct `bool`
* _target `address`

## deposit

**Parameters:**
* _amount `uint256`
* _target `address`

## withdraw

**Parameters:**
* _amount `uint256`
* _target `address`

## tokenTransfer

**Parameters:**
* _to `address`
* _target `address`
* _amount `uint256`

## increaseBalance

**Parameters:**
* _target `address`
* _amount `uint256`

## decreaseBalance

**Parameters:**
* _target `address`
* _amount `uint256`

## balanceOf

**Parameters:**
* _target `address`

**Return Parameters:**
* `uint256`

<br/><br/>

# Wallet
*Wallet*
## deposit

**Parameters:**
* _amount `uint256`
* _target `address`

## withdraw

**Parameters:**
* _amount `uint256`
* _target `address`

## tokenTransfer

**Parameters:**
* _to `address`
* _target `address`
* _amount `uint256`

## increaseBalance

**Parameters:**
* _target `address`
* _amount `uint256`

## decreaseBalance

**Parameters:**
* _target `address`
* _amount `uint256`

## balanceOf

**Parameters:**
* _target `address`

**Return Parameters:**
* `uint256`

<br/><br/>

# Queue
*ObjStruct*
## constructor

**Parameters:**
* data `address`

## enqueue

**Parameters:**
* data `bytes32`

## dequeue
**Return Parameters:**
* data `bytes32`
## isEmpty
**Return Parameters:**
* `bool`
## getNth

**Parameters:**
* n `uint256`

**Return Parameters:**
* data `bytes32`
## length
**Return Parameters:**
* `uint256`

<br/><br/>

# Report
*ObjStruct*
## makeMetaDataForLink

**Parameters:**
* _name `bytes32`
* _domain `bytes`

**Return Parameters:**
* `bytes32`
## checkReInspect

**Parameters:**
* target `address`
* list `(address => bool)`

**Return Parameters:**
* `bool`
## makeNewLink

**Parameters:**
* _domain `bytes`
* _defendeeName `bytes32`
* msgsender `address`
* _ip `bytes32`

**Return Parameters:**
* `Link`
## checkBlackList

**Parameters:**
* _list `bytes`
* _target `bytes`

**Return Parameters:**
* `bool`

<br/><br/>

# Notify
*Notify*
## constructor
## holdDatabase

**Parameters:**
* _reportStorage `ReportData`
* _defendeeStorage `DefendeeData`

## notifyHandler

**Parameters:**
* _domain `bytes`
* _defendeeName `bytes32`
* _ip `bytes32`

<br/><br/>

# InspectData
*InspectData*
## constructor

**Parameters:**
* _noticeAddress `address`
* _inspectAddress `address`
* _judgeAddress `address`

## getAbled

**Parameters:**
* _target `address`

**Return Parameters:**
* `bool`
## getRate

**Parameters:**
* _target `address`

**Return Parameters:**
* `uint16`
## getWinningStreak

**Parameters:**
* _target `address`

**Return Parameters:**
* `uint16`
## getWinningState

**Parameters:**
* _target `address`

**Return Parameters:**
* `bool`
## setInspector

**Parameters:**
* _target `address`

## setWinning

**Parameters:**
* _target `address`
* _result `bool`
* _second `bool`

## decideKeepRole

**Parameters:**
* _target `address`

**Return Parameters:**
* `bool`

<br/><br/>

# RateDefendee
*RateDefendee*
## getRateDefendee

**Parameters:**
* _defendeeName `bytes32`

**Return Parameters:**
* `uint16`
## incrementRateDefendee

**Parameters:**
* _defendeeName `bytes32`

## decreaseRateDefendee

**Parameters:**
* _defendeeName `bytes32`

<br/><br/>

# JudgeByMedia
*JudgeByMedia*
## constructor
## holdDatabase

**Parameters:**
* _reportStorage `ReportData`
* _inspertorStorage `InspectData`
* _defendeeStorage `DefendeeData`

## registerCopyrighter

**Parameters:**
* _name `bytes32`

## registerDefendee

**Parameters:**
* _name `bytes32`
* _pendingEth `uint256`
* _rewardAmount `uint256`
* _inspectCount `uint8`

**Return Parameters:**
* `bool`
## deleteDefendee

**Parameters:**
* _defendeeName `bytes32`

## addIPToBlackList

**Parameters:**
* _ip `bytes32`
* _defendeeName `bytes32`

## addIPtoWhiteList

**Parameters:**
* _ip `bytes32`
* _defendeeName `bytes32`

## changeModeOfDefendee

**Parameters:**
* _defendeeName `bytes32`
* _mode `uint8`

## judge

**Parameters:**
* _domain `bytes`
* _defendeeName `bytes32`
* _decision `bool`

## approveReport

**Parameters:**
* _meta `bytes32`
* _defendeeName `bytes32`

## denyReport

**Development notice:**
*신고의 거부는 저작물의 평점을 낮추고, 이 낮춘 평점을 통해, 저작물은*


**Parameters:**
* _meta `bytes32`

## compensateReport

**Parameters:**
* meta `bytes32`
* _defendeeName `bytes32`

## compensateFee
## holdToken

**Parameters:**
* _token `DetokToken`

## getRate

**Parameters:**
* _target `address`

**Return Parameters:**
* `uint16`
## increaseRate

**Parameters:**
* _targetAddress `address`

## decreaseRate

**Parameters:**
* _targetAddress `address`

**Return Parameters:**
* `bool`
## increaseRateForDenySecond

**Parameters:**
* _targetAddress `address`

## decreaseRateForDenySecond

**Parameters:**
* _targetAddress `address`

## getRateDefendee

**Parameters:**
* _defendeeName `bytes32`

**Return Parameters:**
* `uint16`
## incrementRateDefendee

**Parameters:**
* _defendeeName `bytes32`

## decreaseRateDefendee

**Parameters:**
* _defendeeName `bytes32`

# TokenTaker
## holdToken

**Parameters:**
* _token `DetokToken`

# Compensate
*Compensate*
## compensateReport

**Parameters:**
* meta `bytes32`
* _defendeeName `bytes32`

## compensateFee
## holdToken

**Parameters:**
* _token `DetokToken`

## getRate

**Parameters:**
* _target `address`

**Return Parameters:**
* `uint16`
## increaseRate

**Parameters:**
* _targetAddress `address`

## decreaseRate

**Parameters:**
* _targetAddress `address`

**Return Parameters:**
* `bool`
## increaseRateForDenySecond

**Parameters:**
* _targetAddress `address`

## decreaseRateForDenySecond

**Parameters:**
* _targetAddress `address`

## getRateDefendee

**Parameters:**
* _defendeeName `bytes32`

**Return Parameters:**
* `uint16`
## incrementRateDefendee

**Parameters:**
* _defendeeName `bytes32`

## decreaseRateDefendee

**Parameters:**
* _defendeeName `bytes32`

<br/><br/>

# RateInspector
*RateInspector*
## getRate

**Parameters:**
* _target `address`

**Return Parameters:**
* `uint16`
## increaseRate

**Parameters:**
* _targetAddress `address`

## decreaseRate

**Parameters:**
* _targetAddress `address`

**Return Parameters:**
* `bool`
## increaseRateForDenySecond

**Parameters:**
* _targetAddress `address`

## decreaseRateForDenySecond

**Parameters:**
* _targetAddress `address`

<br/><br/>

# Inspect
## constructor
## holdDatabase

**Parameters:**
* _reportStorage `ReportData`
* _inspertorStorage `InspectData`
* _defendeeStorage `DefendeeData`

## registerInspector
**Return Parameters:**
* `bool`
## inspect

**Parameters:**
* _domain `bytes`: *domain of target report*
* _defendeeName `bytes32`: *copyright's name of target report*
* _decision `bool`: *Inspector's decision of target report*

## getRate

**Parameters:**
* _target `address`

**Return Parameters:**
* `uint16`
## increaseRate

**Parameters:**
* _targetAddress `address`

## decreaseRate

**Parameters:**
* _targetAddress `address`

**Return Parameters:**
* `bool`
## increaseRateForDenySecond

**Parameters:**
* _targetAddress `address`

## decreaseRateForDenySecond

**Parameters:**
* _targetAddress `address`

