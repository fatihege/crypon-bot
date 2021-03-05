const db = require("wio.db");

module.exports = {
    name: "channelDelete",
    once: false,
    async run(channel, client) {
        if (channel.guild) {
            if (await db.fetch("logch_" + channel.guild.id)) {
                const logChannel = await db.fetch("logch_" + channel.guild.id);
                const logch = channel.guild.channels.cache.find(
                    (ch) => ch.id === logChannel
                );

                let logEmbed = {
                    color: 0xe60ffa,
                    title: "Kanal Silindi",
                    description: `**${channel.name}** kanalı silindi.`
                };

                return logch.send({ embed: logEmbed });
            }
        }
    }
};
