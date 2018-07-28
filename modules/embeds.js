const Discord = require('discord.js');
const config = require('../data/config.json');


module.exports.infoCmd = new Discord.RichEmbed()
	    .setColor(0x4793FF)
	    .setTitle("Pixel: Moderation & Management")
	    .setDescription(`*Feel the wrath of the quite sharp Pixel Bot. Developed by Paradaux for use by the IcePlex Network*`)

module.exports.muted1 = new Discord.RichEmbed()
		.setColor(0x4793FF)
		.setTitle("Muted.")
		.setDescription(`You have been muted. You are not allowed to send messages on IcePixel until 1) You're un-muted or 2) The time specified for your mute has run out.`)

module.exports.help1 = new Discord.RichEmbed();

module.exports.joinMessage = new Discord.RichEmbed()
		.setColor(0x4793FF)
		.setAuthor("Before you get started...")
		.setTitle("IcePlex: Before You ")