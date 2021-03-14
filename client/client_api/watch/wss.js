var Web3 = require("web3");
require('dotenv').config();

const options = {
    timeout: 3000000, // ms

    clientConfig: {
        // Useful if requests are large
        maxReceivedFrameSize: 100000000,   // bytes - default: 1MiB
        maxReceivedMessageSize: 100000000, // bytes - default: 8MiB

        // Useful to keep a connection alive
        keepalive: true,
        keepaliveInterval: -1 // ms
    },

    // Enable auto reconnection
    reconnect: {
        auto: true,
        delay: 1000, // ms
        maxAttempts: 10,
        onTimeout: false
    }
};

var provider = new Web3.providers.WebsocketProvider(process.env.RPC, options);
let web3 = new Web3(provider);

provider.on('connect', e => console.log('WS connect', e));
provider.on('error', e => console.log('WS Error', e));
provider.on('end', e => {
  console.log(e);
  console.log('WS closed');
});

module.exports = web3;