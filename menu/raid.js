emojis = {
    a: '🇦', b: '🇧', c: '🇨', d: '🇩',
    e: '🇪', f: '🇫', g: '🇬', h: '🇭',
    i: '🇮', j: '🇯', k: '🇰', l: '🇱',
    m: '🇲', n: '🇳', o: '🇴', p: '🇵',
    q: '🇶', r: '🇷', s: '🇸', t: '🇹',
    u: '🇺', v: '🇻', w: '🇼', x: '🇽',
    y: '🇾', z: '🇿', 0: '0⃣', 1: '1⃣',
    2: '2⃣', 3: '3⃣', 4: '4⃣', 5: '5⃣',
    6: '6⃣', 7: '7⃣', 8: '8⃣', 9: '9⃣',
    10: '🔟', '#': '#⃣', '*': '*⃣',
    '!': '❗', '?': '❓',
};



const embed = new Discord.RichEmbed()
    .setAuthor("PixelBot's Raid Protection Utility", "https://cdn.discordapp.com/attachments/468084162151055360/469576279642079232/icepixel.png")
    .setColor(0x006400)
    .setDescription("Various Utilities for quick use in event of a raid!\n")



const buttons = [{
        emoji: emojis[1],
        run: (user, message) => {
            var member = message.guild.member(user.id);
            message.reply("This feature is not yet implemented.").catch(console.error);
        }
    },
    {
        emoji: emojis[2],
        run: (user, message) => {
            var member = message.guild.member(user.id);
            message.reply("This feature is not yet implemented.").catch(console.error);
        }
    },
    {
        emoji: emojis[3],
        run: (user, message) => {
            var member = message.guild.member(user.id);
            message.reply("This feature is not yet implemented.").catch(console.error);
        }
    }
]