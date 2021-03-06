const db = require("wio.db");

module.exports = {
    name: "roleUpdate",
    once: false,
    async run(oldRole, newRole) {
        if (oldRole.guild) {
            if (await db.fetch("logch_" + oldRole.guild.id)) {
                const logChannel = await db.fetch("logch_" + oldRole.guild.id);
                const logch = oldRole.guild.channels.cache.find(
                    (ch) => ch.id === logChannel
                );

                let logEmbed = {
                    color: 0xe60ffa,
                    title: `Rol Güncellendi`,
                    fields: [
                        {
                            name: "|-**Önce**-|",
                            value: `**Ad:** ${oldRole.name}\n**Renk:** ${
                                oldRole.hexColor
                            }\n**Bahsedilebilir:** ${
                                oldRole.mentionable ? "Evet" : "Hayır"
                            }`
                        },
                        {
                            name: "|-**Sonra**-|",
                            value: `**Ad:** ${newRole.name}\n**Renk:** ${
                                newRole.hexColor
                            }\n**Bahsedilebilir:** ${
                                newRole.mentionable ? "Evet" : "Hayır"
                            }`
                        }
                    ]
                };

                if (
                    logEmbed.fields[0].value.toString() ==
                    logEmbed.fields[1].value.toString()
                ) {
                    return;
                }

                return logch.send({ embed: logEmbed });
            }
        }
    }
};
