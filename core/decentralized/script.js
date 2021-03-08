const Notify = artifacts.require("./Notify");
const Inspect = artifacts.require("./Inspect");
const JudgeByMedia = artifacts.require("./JudgeByMedia");
const ReportData = artifacts.require("./storageContract/ReportData");
const InspectData = artifacts.require("./storageContract/InspectData");
const DefendeeData = artifacts.require("./storageContract/DefendeeData");


module.exports = async function(callback) {
    let notdat = await ReportData.deployed();
    let insdat = await InspectData.deployed();
    let defdat = await DefendeeData.deployed();
    let jud = await JudgeByMedia.deployed();
    let not = await Notify.deployed();
    let ins = await Inspect.deployed();
    let acc = await web3.eth.getAccounts();
  
    copyrighter1= web3.utils.fromAscii("Netflix");
    await jud.registerCopyrighter(copyrighter1, {from:acc[0]});
    copyrighter2 = web3.utils.fromAscii("Naver");
    await jud.registerCopyrighter(copyrighter2, {from:acc[1]});
    copyrighter3 = web3.utils.fromAscii("Bts");
    await jud.registerCopyrighter(copyrighter3, {from:acc[2]});
    copyrighter4 = web3.utils.fromAscii("Imagine dragons");
    await jud.registerCopyrighter(copyrighter4, {from:acc[3]});
    copyrighter5 = web3.utils.fromAscii("Tving");
    await jud.registerCopyrighter(copyrighter5, {from:acc[4]});
    copyrighter6 = web3.utils.fromAscii("Wavve");
    await jud.registerCopyrighter(copyrighter6, {from:acc[5]});
    copyrighter7 = web3.utils.fromAscii("Watcha");
    await jud.registerCopyrighter(copyrighter7, {from:acc[6]});
    copyrighter8 = web3.utils.fromAscii("Hulu");
    await jud.registerCopyrighter(copyrighter8, {from:acc[7]});
    copyrighter9 = web3.utils.fromAscii("Disney");
    await jud.registerCopyrighter(copyrighter9, {from:acc[8]});

    let multi1 = web3.utils.fromUtf8("The Game Of Thrones");
    let multi2 = web3.utils.fromUtf8("bts - On");
    let multi3 = web3.utils.fromUtf8("Frozen");
    let multi4 = web3.utils.fromUtf8("Its Okay to Not Be Okay");
    let multi5 = web3.utils.fromUtf8("Appearanceism");
    let multi6 = web3.utils.fromUtf8("Radioactive");
    let multi7 = web3.utils.fromUtf8("It's your turn");
    let multi8 = web3.utils.fromUtf8("Stranger Things");
    let multi9 = web3.utils.fromUtf8("Believer");
    let multi10 = web3.utils.fromUtf8("Zootopia");
    let multi11 = web3.utils.fromUtf8("Three meals5");
    let val = await web3.utils.toWei("0.3", "ether");
    let val2 = "1000000000000000000000";
    let val3 = "6700000000000000000000";
    let val4 = "120000000000000000000";
    let val5 = "220000000000000000000";
    let val6 = "270000000000000000000";
    let val7 = "130000000000000000000";
    let val8 = "180000000000000000000";
    let val9 = "50000000000000000000";

    await jud.registerDefendee(multi1, val, val2, 3, {from:acc[6], value : val});
    await jud.registerDefendee(multi2, val, val2, 3, {from:acc[2], value : val});
    await jud.registerDefendee(multi3, val, val2, 3, {from:acc[8], value : val});
    await jud.registerDefendee(multi4, val, val2, 3, {from:acc[0], value : val});
    await jud.registerDefendee(multi5, val, val2, 3, {from:acc[1], value : val});
    await jud.registerDefendee(multi6, val, val3, 3, {from:acc[3], value : val});
    await jud.registerDefendee(multi7, val, val4, 3, {from:acc[7], value : val});
    await jud.registerDefendee(multi8, val, val4, 3, {from:acc[0], value : val});
    await jud.registerDefendee(multi9, val, val5, 3, {from:acc[3], value : val});
    await jud.registerDefendee(multi10, val, val6, 3, {from:acc[8], value : val});
    await jud.registerDefendee(multi11, val, val7, 3, {from:acc[4], value : val});

 
    val = await web3.utils.toWei("0.3","ether")
    val2 = "100000000000000000000"
    val3 = "120000000000000000000"
    val4 = "130000000000000000000"
    val5 = "150000000000000000000"
    val6 = "200000000000000000000"
    val7 = "210000000000000000000"
    val8 = "180000000000000000000"
    val9 = "230000000000000000000"
    multi1 = web3.utils.fromUtf8("13 Reasons Why")
    multi2 = web3.utils.fromUtf8("LOVE DEATH + ROBOTS")
    multi3 = web3.utils.fromUtf8("Orange Is the New Black")
    multi5 = web3.utils.fromUtf8("The Walking Dead")
    multi6 = web3.utils.fromUtf8("Breaking Bad")
    multi8 = web3.utils.fromUtf8("Black Mirror")

    await jud.registerDefendee(multi1, val, val2, 1, {from:acc[0], value : val})
    await jud.registerDefendee(multi2, val, val3, 1, {from:acc[0], value : val})
    await jud.registerDefendee(multi3, val, val4, 1, {from:acc[0], value : val})
    await jud.registerDefendee(multi5, val, val6, 1, {from:acc[0], value : val})
    await jud.registerDefendee(multi6, val, val7, 1, {from:acc[0], value : val})
    await jud.registerDefendee(multi8, val, val9, 1, {from:acc[0], value : val})
    console.log("Finish! press Ctrl + C");
}