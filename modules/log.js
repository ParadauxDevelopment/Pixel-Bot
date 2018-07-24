module.exports.createLog = function log(type, tbl, msg, client) {
    logEmbed = new Discord.RichEmbed()
        .setAuthor("[" + type + "]: " + msg.author.username + "#" + msg.author.discriminator, msg.author.avatarURL)
        .setDescription(tbl);
    client.channels.get(config.logchannel).send(logEmbed);
}