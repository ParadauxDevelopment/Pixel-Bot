const Discord = require('discord.js');
const config = require('../data/config.json');

function error(errtype, errmsg, msg) {
        errorEmbed = new Discord.RichEmbed()
            .setAuthor("Error!", "https://cdn.discordapp.com/attachments/465522565130223626/469665205870133248/unknown.png")
            .setDescription(errtype + ": " + errmsg);
        msg.channel.send(errorEmbed);
}

function log(type, tbl, msg, client) {
        logEmbed = new Discord.RichEmbed()
            .setAuthor("[" + type + "]: " + msg.author.username + "#" + msg.author.discriminator, msg.author.avatarURL)
            .setDescription(tbl);
        client.channels.get(config.logchannel).send(logEmbed);
}

module.exports.purge = async function purge(message, args, client) {
    message.delete(); // Let's delete the command message, so it doesn't interfere with the messages we are going to delete.

    // Now, we want to check if the user has the `bot-commander` role, you can change this to whatever you want.
    // We want to check if the argument is a number

    const fetched = await message.channel.fetchMessages({limit: args[2]}); // This grabs the last number(args) of messages in the channel.
    message.channel.bulkDelete(fetched)
        .catch(error => message.channel.send(`Error: ${error}`)); // If it finds an error, it posts it into the channel.

    log("MODERATOR COMMAND", "User deleted `"  + args[2] + "` messages using " + config.prefix + "mod purge.", message, client)
}

