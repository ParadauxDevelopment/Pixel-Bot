const Discord = require('discord.js');
const moment = require('moment');
const config = require('./data/config.json');
const embeds = require('./modules/embeds.js');
const commandHandler = require('./modules/commands.js');
const muteHandler = require('./modules/muteCmd.js');
const configHandler = require('./modules/confighandler.js')
const client = new Discord.Client();
const muted = {}



function error(errtype, errmsg, msg) {
    errorEmbed = new Discord.RichEmbed()
        .setColor(0xff0000)
        .setAuthor("Error!", "https://cdn.discordapp.com/attachments/465522565130223626/469665205870133248/unknown.png")
        .setDescription(errtype + ": " + errmsg);
    msg.channel.send(errorEmbed);
}

function log(type, tbl, msg) {
    logEmbed = new Discord.RichEmbed()
        .setColor(0x4793FF)
        .setAuthor("[" + type + "]: " + msg.author.username + "#" + msg.author.discriminator, msg.author.avatarURL)
        .setDescription(tbl);
    msg.channel.send(logEmbed)
    client.channels.get(config.logchannel).send(logEmbed);
}

const commands = {
    'info': (msg) => {
        msg.channel.send(embeds.infoCmd);
    },

    'help': (msg, args) => {
        console.log("hello world!");
    },

    'mod': (msg, args) => {
        if (msg.member.roles.find("name", "Pixel-Admin") || msg.member.roles.find("name", "Pixel-Mod")) {
            console.log("argslength: " + args.length)
            console.log(args);
            if (args.length <= 1) {
                error("Syntax Error", "command: `mod` requires at least one argument.", msg);
                return;
            }
            // else if (args[0] === "") {}
            else if (args[1] === "purge") {
                if (args.length == 3) {

                    if (isNaN(args[2])) {
                        error("Syntax Error", "command: `mod purge` requires the arguments `amount` but `amount` was not equal to an integer.", msg); //
                        return;
                    }

                    commandHandler.purge(msg, args, client);
                    return;

                } else {
                    error("Syntax Error", "command: `mod purge` requires the arguments `amount`", msg);
                }

            } else if (args[1] === "mute") {
                if (args.length === 4) {
                    if (isNaN(args[3])) {
                        error("Syntax Error", "command: `mod mute` requires the arguments `time` but `time` was not equal to an integer.", msg); //
                        return;
                    }
                    username = msg.mentions.members.first().user.username;
                    log("MUTE USER", "User has muted: " + username + " for: " + args[3] + " minutes.", msg);
                    muteHandler.addMute(msg.mentions.members.first().user.id, args[3])
                } else {
                    error("Syntax Error", "command: `mod mute` requires the arguments `user, time (minutes)`", msg);
                }
            } else {
                error("Permission Error", "You lack the required permissions for this command.", msg);
            }
        }
    },

    'admin': (msg, args) => {
        if (msg.member.roles.find("name", "Pixel-Admin")) {
            if (args.length <= 2) {
                error("Syntax Error", "command: `admin` requires at least one argument.", msg);
                return;
            }

            if (args[1] === "exit") {
                log("ADMIN COMMAND", "Bot terminated.", msg)
                    .then(() => process.exit());
            }
        }
    },

    'dev': (msg, args) => {
        console.log("dev")
        console.log(args)
        console.log(args.length)
        if (msg.member.roles.find("name", "Pixel-Dev") || msg.author.id === config.testuser) {
            if (args.length <= 1) {
                error("Syntax Error", "command: `dev` requires at least one argument.", msg);
                return;
            } else {
                if (args[1] === "sendas") {
                    var listArgs = "";
                    for (i = 3; i <= args.length - 1; i++) {
                        console.log(listArgs)
                        listArgs = listArgs + " " + (args[i]);
                    }
                    client.channels.get(args[2]).send(listArgs);
                } else if (args[1] === "setconfigvalue") {
                    config[args[2]] = args[3];
                    console.log(config);    
                    configHandler.writeConfig("./data/config.json", config)
                } else if (args[1] === "showconfig") {
                    token = config.token;
                    config.token = "redacted";
                    msg.channel.send("```" + JSON.stringify(config, null, 4) + "```");
                    config.token = token;
                    token = [];
                }
            }
        } else {
            error("Permission Error", "You lack the required permissions for this command.", msg);
        }
    }
}







client.on('ready', () => {
    console.log(`Pixel has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guild(s) at ${moment().format('MMMM Do YYYY, h:mm:ss a')}`);
    console.log(`Version: ${config.version}. Developed by Rían Errity (ParadauxDev) with full rights retained by himself.`);
    client.user.setActivity('you whilst you sleep..', {
        type: 'WATCHING'
    });
});

client.on("guildMemberAdd", (member) => {
    console.log(`New User "${member.user.username}" has joined "${member.guild.name}"`);
    // Check if they want stats//
});

client.on('message', msg => {
    var args = msg.content.slice(config.prefix.length).trim().split(/ +/g)
    if (muteHandler.checkMuted(msg.author.id.toString())) {
        msg.delete();
        msg.author.send(embeds.muted1).catch();
    } else {
        if (!msg.content.startsWith(config.prefix)) return;
        if (commands.hasOwnProperty(msg.content.toLowerCase().slice(config.prefix.length).split(' ')[0])) commands[msg.content.toLowerCase().slice(config.prefix.length).split(' ')[0]](msg, args);
    }
});

client.login(config.token);