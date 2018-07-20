const Discord = require('discord.js');
const config = require('../data/config.json');


module.exports.infoCmd = new Discord.RichEmbed()
	    .setColor(0x006400)
	    .setTitle("Pixel: Moderation & Management")
	    .setDescription(`*"Feel the wrath of the quite sharp Pixel Bot. Developed by Paradaux for use by the 'Ice Pixel' Minecraft Server.*\n\n\n`)
	    .addBlankField()
	    .addField("Basic Commands: ", "\n\n- ;info : Displays this information\n- ;help : Displays this information\n")
	    .addField("Moderation/Administration Commands", "\n\nFor more information use ;help mod and ;help admin respectively");
