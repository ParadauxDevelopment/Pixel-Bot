const Discord = require('discord.js');
const config = require('../data/config.json');


module.exports.infoCmd = new Discord.RichEmbed()
	    .setColor(0x4793FF)
	    .setTitle("Pixel: Moderation & Management")
	    .setDescription(`*"Feel the wrath of the quite sharp Pixel Bot. Developed by Paradaux for use by the 'Ice Pixel' Minecraft Server.*\n\n\n`)
	    .addBlankField()
	    .addField("Basic Commands: ", "\n\n- ;info : Displays this information\n- ;help : Displays this information\n")
	    .addField("Moderation/Administration Commands", "\n\nFor more information use ;help mod and ;help admin respectively");

module.exports.muted1 = new Discord.RichEmbed()
		.setColor(0x4793FF)
		.setTitle("Muted.")
		.setDescription(`You have been muted. You are not allowed to send messages on IcePixel until 1) You're un-muted or 2) The time specified for your mute has run out.`)


module.exports.help1 = new Discord.RichEmbed();