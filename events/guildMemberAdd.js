const db = require("wio.db");

module.exports = {
    name: "guildMemberAdd",
    once: false,
    async run(member, client) {
        if (member.guild) {
            const guildId = member.guild.id;
            if (await db.fetch("autorole_" + guildId)) {
                const autoRole = await db.fetch("autorole_" + guildId);
                const role = member.guild.roles.cache.find(
                    (role) => role.id === autoRole
                );
                member.roles.add(role);

                if (await db.fetch("welcomech_" + guildId)) {
                    const welcomechid = await db.fetch("welcomech_" + guildId);
                    const welcomech = member.guild.channels.cache.find(
                        (ch) => ch.id == welcomechid
                    );
                    const welcomeMessages = [
                        `Aramıza hoşgeldin ${member}. Seni burada görmek güzel.`,
                        `Ooo, ${member} gelmiş. Herkes ayağa kalksın!`,
                        `Yaşasın! Sonunda sende aramıza katıldın ${member}!`,
                        `Hoşgeldin ${member}. Az kalsın partiyi kaçırıyordun.`,
                        `N'aber ${member}. Bu akşam yemek senden.`
                    ];

                    if (welcomech) {
                        const randomMessageIndex = Math.floor(
                            Math.random() * welcomeMessages.length
                        );
                        const randomMessage =
                            welcomeMessages[randomMessageIndex];
                        welcomech.send(randomMessage);
                    }
                }
            }
        }
    }
};
