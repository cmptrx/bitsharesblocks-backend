'use strict';

require('node-monkey').start({host: "127.0.0.1", port:"50500"});


const config = require('../config.json');
console.log('Lanching block collection scripts at port:', config.rpc_port);



var Apis = require("./grapheneApi")(function() {setTimeout(init, 2500)});
var updateObjects = require("./chainState");

// console.log("Apis.initPromise:", Apis.initPromise);
// 
function init() {
    Apis.instance().initPromise.then(function(result) {
        // console.log("apis ready:", result, Apis.instance().db());
        // Apis.instance().db().call("lookup_accounts", ["A", 10]).then(function(result) {
        //     console.log("lookup:", result);
        // })

        Apis.instance().db().call("set_subscribe_callback", [updateObjects, true]).then(result => {
            console.log("set_subscribe_callback result:", result);
        });
        var blocks = require("./components/newBlocks")(Apis.instance().db());

        blocks.latestBlocks();


    }).catch(err => {
        console.log("initPromise error:", err);
        setTimeout(init, 2500);
    });  
}

init();

// console.log(Apis.instance().db();

// COMPONENTS
// var blocks = require('./components/blocks');
// var home = require('./components/home');
// var accounts = require('./components/accounts');
// var missing = require('./components/missingBlocks');

// INTERVALS

// setInterval(blocks.update, 10000);
// setInterval(home.securityUpdate, 60000);
// setInterval(home.update, 60000);
// setInterval(home.blockchainUpdate, 1000 * 60 * 10);

// SINGLE LAUNCH

// blocks.update();
// home.update();



// ws.send()

