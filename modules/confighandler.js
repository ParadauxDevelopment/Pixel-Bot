var fs = require("fs");

module.exports.writeConfig = function (file, object) {
    fs.writeFile(file, JSON.stringify(object, null, 4), (err) => {
        if (err) {
            console.error(err);
            return;
        };
    });
    console.log("[debug] Config has been re-written");
} 