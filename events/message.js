const db = require("wio.db");

module.exports = {
    name: "message",
    once: false,
    async run(message, client) {
        var prefix;
        if (message.guild && message.guild.available === true) {
            let guildId = client.guilds.cache.get(message.guild.id).id;
            if (await db.fetch(`prefix_${guildId}`)) {
                prefix = await db.fetch(`prefix_${guildId}`);
            } else {
                prefix = "!c";
            }

            if (
                message.content.toLowerCase().trim().toString() === "chelp" ||
                message.content.toLowerCase().trim().toString() === "prefix"
            ) {
                return message.channel.send(
                    `Bu sunucudaki önekim \`${prefix}\`\nBütün komutlarımın listesine ulaşmak için \`${prefix}help\` komutunu kullanabilirsin.`
                );
            }
        }

        if (message.channel.type == "dm") {
            await db.set("prefix_dm_" + message.channel.id, "!c");
            prefix = await db.fetch("prefix_dm_" + message.channel.id);
        }

        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command =
            client.commands.get(commandName) ||
            client.commands.find(
                (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
            );
        if (!command) return;

        if (command.guildOnly && message.channel.type == "dm") {
            return message.reply("Bu komutu özel mesajlarda kullanamazsın!");
        }

        if (command.args && !args.length) {
            let reply = `Lütfen mesaja bir argüman ver ${message.author}!`;
            if (command.usage) {
                reply += `\nBu komutun kullanımı: \`${prefix}${command.name} ${command.usage}\``;
            }
            return message.channel.send(reply).then((msg) => {
                msg.delete({ timeout: 7000 });
            });
        }

        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(command.permissions)) {
                return message.channel
                    .send(
                        `**Bunu yapamazsın ${message.author}!** Yeterli yetkin yok.`
                    )
                    .then((msg) => {
                        msg.delete({ timeout: 7000 });
                    });
            }
        }

        try {
            command.run(message, args, client);
        } catch (error) {
            console.error(error);
            message.channel
                .send(`Bu komut çalıştırılırken bir hata meydana geldi.`)
                .then((msg) => {
                    msg.delete({ timeout: 7000 });
                });
        }
    }
};
