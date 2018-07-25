var fs = require("fs");

function writeMutedPlayers(object) {
    fs.writeFile("./data/muted-players.json", JSON.stringify(object, null, 4), (err) => {
        if (err) {
            console.error(err);
            return;
        };
    });
    console.log("[debug] Config has been re-written");
} 

module.exports.addInfraction = function () {

}