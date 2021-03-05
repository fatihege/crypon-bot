const db = require("wio.db");

module.exports = {
    name: "message",
    once: false,
    async run(message, client) {
        if (message.guild && message.guild.available === true) {
            let guildId = client.guilds.cache.get(message.guild.id).id;
            if (await db.fetch(`prefix_${guildId}`)) {
                var prefix = await db.fetch(`prefix_${guildId}`);
            } else {
                var prefix = "!c";
            }

            if (
                message.content.toLowerCase().trim().toString() === "chelp" ||
                message.content.toLowerCase().trim().toString() === "prefix"
            ) {
                message.channel
                    .send(
                        `Bu sunucudaki prefixim \`${prefix}\`\nBütün komutlarımın listesine ulaşmak için \`${prefix}help\` komutunu kullanabilirsin.`
                    )
                    .then((msg) => {
                        msg.delete({ timeout: 5000 });
                    });
                return;
            }
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
            return message.channel.send(reply);
        }

        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(command.permissions)) {
                return message.channel.send(
                    `**Bunu yapamazsın ${message.author}!** Yeterli yetkin yok.`
                );
            }
        }

        try {
            command.run(message, args, client);
        } catch (error) {
            console.error(error);
            message.channel.send(
                `Bu komut çalıştırılırken bir hata meydana geldi.`
            );
        }
    }
};
