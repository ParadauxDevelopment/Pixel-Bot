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
    message.delete();
    const fetched = await message.channel.fetchMessages({limit: args[2]}); 
    message.channel.bulkDelete(fetched)
        .catch(error => message.channel.send(`Error: ${error}`));
    config.log(fetched);
    log("MODERATOR COMMAND", "User deleted `"  + args[2] + "` messages using " + config.prefix + "mod purge.", message, client)
}

