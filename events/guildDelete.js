const db = require("wio.db");

module.exports = {
    name: "guildDelete",
    once: false,
    async run(guild) {
        if (guild) {
					// Delete prefix
					if (await db.fetch("prefix_" + guild.id)) {
						await db.delete("prefix_" + guild.id);
					}

					// Delete log channel
					if (await db.fetch("logch_" + guild.id)) {
						await db.delete("logch_" + guild.id);
					}

					// Delete welcome channel
					if (await db.fetch("welcomech_" + guild.id)) {
						await db.delete("welcomech_" + guild.id);
					}

					// Delete auto role channel
					if (await db.fetch("autorole_" + guild.id)) {
						await db.delete("autorole_" + guild.id);
					}
				}
    }
}