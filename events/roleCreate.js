const db = require("wio.db");

module.exports = {
    name: "roleCreate",
    once: false,
    async run(role) {
        if (role.guild) {
            if (await db.fetch("logch_" + role.guild.id)) {
                const logChannel = await db.fetch("logch_" + role.guild.id);
                const logch = role.guild.channels.cache.find(
                    (ch) => ch.id === logChannel
                );

                let logEmbed = {
                    color: 0xe60ffa,
                    title: `Rol Oluşturuldu`,
                    description: `**Ad:** ${role.name}\n**Renk:** ${
                        role.hexColor
                    }\n**Bahsedilebilir:** ${
                        role.mentionable ? "Evet" : "Hayır"
                    }`
                };

                return logch.send({ embed: logEmbed });
            }
        }
    }
};
