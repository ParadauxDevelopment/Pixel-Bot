var fs = require("fs");
const infractions = require('../data/infractions.json');

function writeMutedPlayers(object) {
    fs.writeFile("./data/infractions.json", JSON.stringify(object, null, 4), (err) => {
        if (err) {
            console.error(err);
            return;
        };
    });
    console.log("[debug] Config has been re-written");
}

module.exports.addInfraction = function(userid, type, amount) {
    // types, warns, kicks, bans
    if (infractions[userid] === undefined) {
        infractions[userid] = {
            "warns": 0,
            "kicks": 0,
            "mutes": 0
        }
    } else if (type === "warns") {
    	infractions[userid]["warns"] = infractions[userid]["warns"] + 1
    } else if (type === "kicks") {
    	infractions[userid]["kicks"] = infractions[userid]["kicks"] + 1
    } else if (type === "mutes") {
    	infractions[userid]["mutes"] = infractions[userid]["mutes"] + 1
    }
}