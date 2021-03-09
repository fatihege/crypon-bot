const { botName } = require("../config.json");
const db = require("wio.db");

module.exports = {
    name: "help",
    description:
        "Botta kullanabileceğiniz bütün komutların listesini çıkartır.",
    aliases: ["yardim"],
    args: false,
    usage: null,
    guildOnly: false,
    permissions: null,
    async run(message, args, client) {
        const { commands } = message.client;
        const prefix = message.guild
            ? await db.fetch("prefix_" + message.guild.id)
            : await db.fetch("prefix_dm_" + message.channel.id);

        const messageEmbed = {
            color: 0xff14b9,
            title: botName + " Komutları",
            description: `Bende kullanabileceğin bütün komutların listesi.\n\n${commands
                .map(
                    (command) =>
                        "**" + command.name + "**: " + command.description
                )
                .join(
                    "\n"
                )}\n\nDaha detaylı bilgi almak için **test** sunucusunda \`${prefix}help <command>\` komutunu kullanabilirsiniz.`
        };

        if (!args.length) {
            return message.author
                .send({ embed: messageEmbed })
                .then((msg) => {
                    if (message.channel.type == "dm") return;
                    message
                        .reply(
                            `Sana bütün komutlarımın listesini özel mesaj olarak gönderdim.`
                        )
                        .then((msg) => {
                            msg.delete({ timeout: 5000 });
                        });
                })
                .catch((err) => {
                    console.error(err);
                    message.reply(
                        `Komutları sana gönderirken bir hatayla karşılaşıyorum.\nÖzel mesajları engellemiş olabilirsin. Bir kontrol et. Eğer yine hatayla karşılaşırsan yapımcım ile iletişime geç.`
                    );
                });
        }

        const name = args[0].toLowerCase();
        const command =
            commands.get(name) ||
            commands.find((c) => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply("Böyle bir komut bulunamadı.").then((msg) => {
                msg.delete({ timeout: 5000 });
            });
        }

        let commandEmbed = {
            color: 0xff14b9,
            title: `**${command.name}** Komutu`,
            description: `**Komut Adı:** ${command.name}\n`
        };

        if (command.aliases) {
            commandEmbed.description += `**Alternatifler:** ${command.aliases.join(
                ", "
            )}\n`;
        }
        if (command.description) {
            commandEmbed.description += `**Açıklama:** ${command.description}\n`;
        }
        if (command.usage) {
            commandEmbed.description += `**Kullanım:** ${prefix}${command.name} ${command.usage}\n`;
        }

        message.channel.send({ embed: commandEmbed });
    }
};
