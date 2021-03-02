const DetokToken = artifacts.require("./token/DetokToken");
const Notify = artifacts.require("./Notify");
const Inspect = artifacts.require("./Inspect");
const JudgeByMedia = artifacts.require("./JudgeByMedia");
const ReportData = artifacts.require("./storageContract/ReportData");
const InspectData = artifacts.require("./storageContract/InspectData");
const DefendeeData = artifacts.require("./storageContract/DefendeeData");
/* @dev 컨트렉트에 기본적으로 실행해야하는 
 * 함수와 세팅을 모두 처리합니다.
 */
module.exports = async function(deployer) {
  await deployer.deploy(DetokToken);
  await deployer.deploy(Notify);
  await deployer.deploy(Inspect);
  await deployer.deploy(JudgeByMedia);
  let tok = await DetokToken.deployed();
  let not = await Notify.deployed();
  let ins = await Inspect.deployed();
  let def = await JudgeByMedia.deployed();
  let notdat = await deployer.deploy(ReportData, not.address, ins.address, def.address);
  let insdat = await deployer.deploy(InspectData, not.address, ins.address, def.address);
  let defdat = await deployer.deploy(DefendeeData, not.address, ins.address, def.address, tok.address);
  
  not.holdDatabase(notdat.address, defdat.address);
  ins.holdDatabase(notdat.address, insdat.address, defdat.address);
  def.holdDatabase(notdat.address, insdat.address, defdat.address);
  def.holdToken(tok.address);
};