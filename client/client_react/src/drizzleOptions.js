import DetokToken from "./contracts/DetokToken.json";
import JudgeByMedia from "./contracts/JudgeByMedia.json";
import Notify from "./contracts/Notify.json";
import Inspect from "./contracts/Inspect.json";

const options = {
  web3: {
    block: false,
    //customProvider: new Web3("ws://localhost:8545"),
  },
  contracts: [DetokToken, JudgeByMedia, Notify, Inspect]
};

export default options;
