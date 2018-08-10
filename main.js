const Discord = require('discord.js');
const moment = require('moment');
const RC = require('reaction-core');

const embeds = require('./modules/embeds.js');
const commandHandler = require('./modules/commands.js');
const muteHandler = require('./modules/muteCmd.js');
const warnHandler = require('./modules/warnCmd.js');
const infractionHandler = require('./modules/infractionhandler.js');
const configHandler = require('./modules/confighandler.js');
const helpMenu = require('./modules/helpmenu.js')

const config = require('./data/config.json');
const mutedUsers = require('./data/muted-players.json')
const warnedUsers = require('./data/warnings.json');
const infractions = require('./data/infractions.json');

const client = new Discord.Client();
const handler = new RC.Handler()

let muted = {}

function error(errtype, errmsg, msg) {
    errorEmbed = new Discord.RichEmbed()
        .setColor(0xff0000)
        .setAuthor("Error!", "https://cdn.discordapp.com/attachments/465522565130223626/469665205870133248/unknown.png")
        .setDescription(errtype + ": " + errmsg);
    msg.channel.send(errorEmbed);
}

function log(type, tbl, msg, anc) {
    logEmbed = new Discord.RichEmbed()
        .setColor(0x4793FF)
        .setAuthor("[" + type + "]: " + msg.author.username + "#" + msg.author.discriminator, msg.author.avatarURL)
        .setDescription(tbl);
    if (anc == false) {} else {
        msg.channel.send(logEmbed)
    }
    client.channels.get(config.logchannel).send(logEmbed);
    return true;
}

function eventLog(type, tbl, guild, user) {
    eventLogEmbed = new Discord.RichEmbed()
        .setColor(0x4793FF)
        .setAuthor("[" + type + "]: " + user.username + "#" + user.discriminator, user.avatarURL)
        .setDescription(tbl);
    client.channels.get(config.logchannel).send(eventLogEmbed);
}


function helpmenu(msg, args) {
    console.log(args)
    if (args.length == 1) {
        msg.channel.send(embeds.infoCmd);
        msg.channel.send("```" + helpMenu.basiccommands + "```")
    } else if (args[1] === "mod") {
        if (msg.member.roles.find("name", "Pixel-Admin") || msg.member.roles.find("name", "Pixel-Mod")) {
            msg.author.send("```" + helpMenu.modcommands + "```")
            msg.reply("I have sent you all of the moderator commands !")
        } else {
            error("Permission Error", "You lack the required permissions for this command.", msg);
        }
    } else if (args[1] === "admin") {
        if (msg.member.roles.find("name", "Pixel-Admin")) {
            msg.author.send("```" + helpMenu.admincommands + "```")
            msg.reply("I have sent you all of the administrator commands !")
        } else {
            error("Permission Error", "You lack the required permissions for this command.", msg);
        }
    }
}

const commands = {
    'info': (msg, args) => {
        helpmenu(msg, args);
    },
    'help': (msg, args) => {
        helpmenu(msg, args);
    },
    'mod': (msg, args) => {
        if (msg.member.roles.find("name", "Pixel-Admin") || msg.member.roles.find("name", "Pixel-Mod")) {
            console.log("argslength: " + args.length)
            console.log(args);
            if (args.length <= 1) {
                error("Syntax Error", "command: `mod` requires at least one argument.", msg);
                return;
            } else if (args[1] === "purge") {
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
                username = msg.mentions.members.first().user.username;
                if (args.length === 4) {
                    if (isNaN(args[3])) {
                        error("Syntax Error", "command: `mod mute` requires the arguments `time` but `time` was not equal to an integer.", msg); //
                        return;
                    }
                    log("MUTE USER", "User has muted: " + username + " for: " + args[3] + " minutes.", msg);
                    muteHandler.addMute(msg.mentions.members.first().user.id, args[3], msg.author, msg.mentions.members.first().user)
                } else {
                    error("Syntax Error", "command: `mod mute` requires the arguments `user, time (minutes)`", msg);
                }
            } else if (args[1] === "unmute") {
                if (args.length === 3) {
                    user = msg.mentions.members.first().user
                    if (muteHandler.checkMuted(user.id)) {
                        muteHandler.removeMute(msg.mentions.members.first().user.id);
                    } else {
                        error("User Error", "User is not muted.", msg);
                    }
                } else {
                    error("Syntax Error", "command: `mod unmute` requires the arguments `user`", msg);
                }
            } else if (args[1] === "warn") {
                if (args.length >= 4) {
                    var listArgs = "";
                    for (i = 3; i <= args.length - 1; i++) {
                        console.log(listArgs)
                        listArgs = listArgs + " " + (args[i]);
                    } 
                    if (!(warnedUsers[msg.mentions.members.first().user.id] instanceof Array)) {
                        var length = 1
                    } else {
                        var legnth = warnedUsers[msg.mentions.members.first().user.id].length
                    }
                    log("WARNING", "User has warned: `" + msg.mentions.members.first().user.username + "` for: `" + listArgs + "` Warning Count: `" + length + "`", msg);
                    warnHandler.addWarning(msg.mentions.members.first().user.id, listArgs);
                } else {
                    error("Syntax Error", "command: `mod warn` requires the arguments `user, reason`", msg);
                }
            } else {
                error("Permission Error", "You lack the required permissions for this command.", msg);
            }
        }
    },

    'admin': (msg, args) => {
        if (msg.member.roles.find("name", "Pixel-Admin")) {
            if (args.length <= 1) {
                error("Syntax Error", "command: `admin` requires at least one argument.", msg);
                return;
            }

            if (args[1] === "exit") {
                process.exit();
            }

            // 
            else if (args[1] === "raid") {
                message.reply("Great.. Welp, here comes the raid protection utility as you requested!")
                let platform = new RC.Menu(roleAssignment.embedone, roleAssignment.buttons1);

            }
        }
    },

    'dev': (msg, args) => {
        if (msg.member.roles.find("name", "Pixel-Dev") || msg.author.id === config.testuser || msg.author.id === config.dev) {
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
                } else if (args[1] === "showmute") {
                    msg.channel.send("```" + JSON.stringify(mutedUsers, null, 4) + "```");
                } else if (args[1] === "showinfractions") {
                    msg.channel.send("```" + JSON.stringify(infractions, null, 4) + "```");
                } else if (args[1] === "showwarnings") {
                    msg.channel.send("```" + JSON.stringify(warnedUsers, null, 4) + "```");
                }
            }
        } else {
            error("Permission Error", "You lack the required permissions for this command.", msg);
        }
    }
}


// Event Handlers

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
    member.guild.channels.find("name", "👋welcome").send(`Hey ${member}! Welcome to ${member.guild.name} :tada::hugging: ! We hope you have fun here, head to the info channel to find out more <#468064424259878922> .`)
});
client.on("guildMemberRemove", (member) => {
    console.log(`User "${member.user.username}" has left "${member.guild.name}"`);
    // Check if they want stats//
    member.guild.channels.find("name", "leave-log").send(`**${member.user.username}#${member.user.discriminator}** has left ${member.guild.name}`)
});

client.on('message', msg => {
    let nono = config.blacklistedsites
    if( nono.some(word => msg.content.toLowerCase().includes(word)) ) {
        if(msg.author.bot) return;
        if (msg.member.roles.find("name", "Owner") || msg.member.roles.find("name", "Staff Manager")) return;
        if (!(warnedUsers[msg.author.id] instanceof Array)) {
            var length = 1
        } else {
            var legnth = warnedUsers[msg.author.id].length
        }
        msg.delete();
        warnHandler.addWarning(msg.author.id, "Blacklisted Website");
        log("WARNING", "PixelBot has warned: `" + msg.author.username + "` for: `" + "Blacklisted Website" + "` Warning Count: `" + length + "` Message Content: `" + msg.content + "`", msg, false);
    }

    var args = msg.content.slice(config.prefix.length).trim().split(/ +/g)
    if (muteHandler.checkMuted(msg.author.id)) {
        msg.delete();
        msg.author.send(embeds.muted1).catch();
    } else {
        if (!msg.content.startsWith(config.prefix)) return;
        if (commands.hasOwnProperty(msg.content.toLowerCase().slice(config.prefix.length).split(' ')[0])) commands[msg.content.toLowerCase().slice(config.prefix.length).split(' ')[0]](msg, args);
    }

});

client.on('guildBanAdd', (guild, user) => {
    console.log(guild)
    console.log(user)
    eventLog("USER BAN", "User has been banned.", guild, user)
});

client.on('guildBanRemove', (guild, user) => {
    console.log(guild)
    console.log(user)
    eventLog("USER UNBAN", "User has been unbanned.", guild, user)
});


client.login(config.token);