const Discord = require('discord.js');
const moment = require('moment');
const config = require('../data/config.json');
var mutedUsers = require('../data/muted-players.json');

module.exports.checkMuted = function checkMuted(id) {
	if(mutedUsers.hasOwnProperty(id)) {
		return true;
	} else {
		return false;
	}
}

module.exports.addMute = function muteUser(userid, time) {
	mutedUsers[userid] = [new Date, moment(new Date).add(30, 'm').toDate()]
	console.log(mutedUsers)
}