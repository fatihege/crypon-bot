const db = require("wio.db");

module.exports = {
    name: "channelDelete",
    once: false,
    async run(channel, client) {
        if (channel.guild && (await db.fetch("logch_" + channel.guild.id))) {
            if ((await db.fetch("logch_" + channel.guild.id)) == channel.id) {
                await db.delete("logch_" + channel.guild.id);
                return;
            } else if (await db.fetch("welcomech_" + channel.guild.id)) {
                await db.delete("welcomech_" + channel.guild.id);
            }
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
};
