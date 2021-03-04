const { botName } = require("../config.json");
const db = require("wio.db");

module.exports = {
    name: "ready",
    once: false,
    async run(client) {
        console.log("Bot ready.");
        client.user.setUsername(botName);
        // client.user.setAvatar("https://imgupload.io/images/2021/02/28/bot-avatar.png");
        let activities = [
					`chelp`,
					`${client.guilds.cache.size} Servers`
				];
				setInterval(() => {
					activities[1] = `${client.guilds.cache.size} Servers`;
				}, 60000);
				let pos = 0;
				let at;
				setInterval(() => {
						if (pos == 0) {
								at = activities[0];
								pos = 1;
						} else {
								at = activities[1];
								pos = 0;
						}
						client.user.setActivity(at, { type: "PLAYING" });
				}, 5000);
    }
}