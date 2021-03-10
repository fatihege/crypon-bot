const pretty = require("pretty-ms");

module.exports = {
    name: "stats",
    description: "Sunucu bilgileri.",
    aliases: ["statistics", "istatistik", "istatistikler"],
    args: false,
    usage: null,
    guildOnly: false,
    permissions: null,
    run(message, args, client) {
        const totalGuild = client.guilds.cache.size;
        let totalMember = 0;
        client.guilds.cache.map(
            (server) => (totalMember += server.members.cache.size)
        );
        const ping = `${client.ws.ping} ms`;
        const memoryUsageCalculation = (
            process.memoryUsage().heapUsed /
            1024 /
            1024
        )
            .toString()
            .split(".");
        const memoryUsage = `${memoryUsageCalculation[0]},${memoryUsageCalculation[1][0]}${memoryUsageCalculation[1][1]}`;

        const uptime = pretty(client.uptime)
            .toString()
            .replace(/y/gi, " Yıl")
            .replace(/d/gi, " Gün")
            .replace(/h/gi, " Saat")
            .replace(/m/gi, " Dakika")
            .replace(/s/gi, " Saniye");

        let embed = {
            color: 0xe60ffa,
            title: "İstatistikler",
            thumbnail: {
                url:
                    "https://cdn.discordapp.com/avatars/815184711416152094/14720c67dbcbbbd60ec7949c7c0f1d2e.png?size=1024"
            },
            description: `**Toplam Sunucu:** ${totalGuild}\n**Toplam Kullanıcı:** ${totalMember}\n**Ping:** ${ping}\n**Bellek Kullanımı:** ${memoryUsage} MB\n**Çalışma Süresi:** ${uptime}`
        };

        message.channel.send({ embed: embed });
    }
};
