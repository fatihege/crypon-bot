const { botName } = require("../config.json");
const db = require("wio.db");
const translate = require('../language/translate');

module.exports = {
    name: "guildCreate",
    once: false,
    async run(guild) {
        await db.set("prefix_" + guild.id, "!c");
        const prefix = await db.fetch("prefix_" + guild.id);
        const channel = guild.channels.cache.filter(c => c.type == "text").find(ch => ch.position == 0);
        const admin = guild.members.cache.find(m => m.hasPermission("ADMINISTRATOR"));

        const aChannel = guild.channels.cache.first();

        channel.send(translate(aChannel, "events.guildCreate.messages.message", botName, prefix));
    }
}
