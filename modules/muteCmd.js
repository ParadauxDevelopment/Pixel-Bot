const Discord = require('discord.js');
const fs = require("fs");
const moment = require('moment');
const _ = require('lodash');
const config = require('../data/config.json');
var mutedUsers = require('../data/muted-players.json');
const infractions = require('../data/infractions.json');
const infractionHandler = require('../modules/infractionhandler.js');

function writeMutedPlayers(object) {
    fs.writeFile("./data/muted-players.json", JSON.stringify(object, null, 4), (err) => {
        if (err) {
            console.error(err);
            return;
        };
    });
}

module.exports.checkMuted = function checkMuted(id) {
    if (mutedUsers.hasOwnProperty(id)) {
        if (mutedUsers[id][1] >= mutedUsers[id][2]) {
	    	console.log(2)
		    mutedUsers = _.omit(mutedUsers, id);
		    writeMutedPlayers(mutedUsers);
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

module.exports.addMute = function muteUser(userid, time, usrobj, mutedusrobj) {
    mutedUsers[userid] = [moment(), moment().add(time, 'm').toDate(), usrobj.username, mutedusrobj.username]
    writeMutedPlayers(mutedUsers);
}

module.exports.removeMute = function unmuteUser(userid) {
    mutedUsers = _.omit(mutedUsers, userid);
    writeMutedPlayers(mutedUsers);
}