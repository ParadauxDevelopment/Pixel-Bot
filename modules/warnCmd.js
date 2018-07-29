const Discord = require('discord.js');
const fs = require("fs");
const moment = require('moment');
const _ = require('lodash');
const config = require('../data/config.json');
const warnedUsers = require('../data/warnings.json');

function writeWarnedPlayers(object) {
    fs.writeFile("./data/warnings.json", JSON.stringify(object, null, 4), (err) => {
        if (err) {
            console.error(err);
            return;
        };
    });
}

module.exports.addWarning = function warningCount(userid) {

}

module.exports.addWarning = function addWarning(userid, reason) {
    console.log(warnedUsers)
    if (!(warnedUsers[userid] instanceof Array)) {
        warnedUsers[userid] = [];
    }

    warning = {
        "time": new Date,
        "reason": reason
    }

    warnedUsers[userid].push(warning);
    console.log("Warning");
    console.log(warning);
    console.log("warnedUsers");
    console.log(warnedUsers);
    writeWarnedPlayers(warnedUsers);
}