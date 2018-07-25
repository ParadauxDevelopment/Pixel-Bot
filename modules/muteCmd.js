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
    console.log("[debug] Config has been re-written");
} 

module.exports.checkMuted = function checkMuted(id) {
	if(mutedUsers.hasOwnProperty(id)) {
		// If the time has expired on the mute



		return true;

	} else {
		return false;
	}
}

module.exports.addMute = function muteUser(userid, time, usrobj, mutedusrobj) {
	mutedUsers[userid] = [new Date, moment(new Date).add(30, 'm').toDate(), usrobj.username, mutedusrobj.username]
	console.log(mutedUsers);
	writeMutedPlayers(mutedUsers);

}

module.exports.removeMute = function unmuteUser(userid) {
	console.log(mutedUsers);
	mutedUsers = _.omit(mutedUsers, userid);
	writeMutedPlayers(mutedUsers);
	console.log(mutedUsers);
}