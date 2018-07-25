const Discord = require('discord.js');
const fs = require("fs");
const moment = require('moment');
const config = require('../data/config.json');
var mutedUsers = require('../data/muted-players.json');

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
		return true;
	} else {
		return false;
	}
}

module.exports.addMute = function muteUser(userid, time) {
	mutedUsers[userid] = [new Date, moment(new Date).add(30, 'm').toDate()]
	console.log(mutedUsers);
	writeMutedPlayers(mutedUsers);
}