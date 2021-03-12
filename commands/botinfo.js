const { version } = require("../package.json");
const os = require("os");
const byteSize = require("byte-size");
const pretty = require("pretty-ms");

module.exports = {
    name: "botinfo",
    description: "Botun kullanım ve işletim sistemi bilgilerini görün.",
    aliases: ["botbilgi"],
    args: false,
    usage: null,
    guildOnly: false,
    permissions: null,
    run(message, args, client) {
        const botUptime = pretty(client.uptime)
            .toString()
            .replace(/y/gi, " Yıl")
            .replace(/d/gi, " Gün")
            .replace(/h/gi, " Saat")
            .replace(/m/gi, " Dakika")
            .replace(/s$/gi, " Saniye");

        const platform = os.platform();
        const typeAndArch = `${os.type()} ${os.arch()}`;
        const osVersion = os.version();
        const fullOS = `${platform} (${typeAndArch}) - ${osVersion}`;

        const osUptime = pretty(os.uptime())
            .toString()
            .replace(/y/gi, " Yıl")
            .replace(/d/gi, " Gün")
            .replace(/h/gi, " Saat")
            .replace(/m/gi, " Dakika")
            .replace(/s$/gi, " Saniye");

        const nodeVersion = process.versions.node;
        const discordJsVersion = require("discord.js").version;
        const botVersion = `v${version}`;

        const totalMemoryConv = byteSize(os.totalmem());
        const totalMemory = `${
            totalMemoryConv.value
        }${totalMemoryConv.unit.toString().toUpperCase()}`;

        const memoryUsageConv = byteSize(process.memoryUsage().heapUsed);
        const memoryUsage = `${
            memoryUsageConv.value
        }${memoryUsageConv.unit.toString().toUpperCase()}`;

        const freeMemoryConv = byteSize(os.totalmem() - os.freemem());
        const freeMemory = `${
            freeMemoryConv.value
        }${freeMemoryConv.unit.toString().toUpperCase()}`;

        const cpuModel = os.cpus()[0].model;
        const cpuSpeed = `${os.cpus()[0].speed}GHz`;
        const cpuCores = os.cpus().length;

        const embed = {
            color: 0xe60ffa,
            title: "Crypon Bot Bilgisi",
            fields: [
                {
                    name: "**Botun Çalışma Süresi**",
                    value: botUptime
                },
                {
                    name: "**İşletim Sistemi**",
                    value: fullOS
                },
                {
                    name: "**Sürümler**",
                    value: `**Crypon Sürümü:** ${botVersion}\n**Node.js Sürümü:** ${nodeVersion}\n**Discord.js Sürümü:** ${discordJsVersion}`
                },
                {
                    name: "**Bellek**",
                    value: `**Toplam Bellek:** ${totalMemory}\n**Kullanılan Bellek:** ${memoryUsage} \n**Boş Bellek:** ${freeMemory}`,
                    inline: true
                },
                {
                    name: "**İşlemci**",
                    value: `**Model:** ${cpuModel}\n**Hız:** ${cpuSpeed}\n**Çekirdek Sayısı:** ${cpuCores}`,
                    inline: true
                }
            ],
            timestamp: new Date(),
            footer: {
                text: "Crypon - Fatih EGE"
            }
        };
        message.channel.send({ embed: embed });
    }
};
