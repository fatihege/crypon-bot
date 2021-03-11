const fs = require("fs");

module.exports = {
    name: "reload",
    description: "Seçtiğiniz komutu yeniden yükleyin.",
    aliases: ["cmdreload", "commandreload", "yenidenyukle"],
    args: true,
    usage: "<komut>",
    guildOnly: true,
    permissions: "MANAGE_ROLES",
    run(message, args, client) {
        if (!args.length) {
            return message.channel.send(
                `Lütfen yeniden yüklenecek komutun adını gir ${message.author}!`
            );
        }
        const commandName = args[0].toLowerCase();
        const command =
            message.client.commands.find(
                (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
            ) || message.client.commands.get(commandName);

        if (!command) {
            return message.channel.send(`Böyle bir komut tanımlı değil!`);
        }

        const commandFiles = fs.readdirSync("./commands");
        const fileName = commandFiles.find((file) =>
            fs.readFileSync(`./commands/${file}`)
        );

        delete require.cache[require.resolve(`./${command.name}.js`)];

        try {
            const newCommand = require(`./${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
            message.channel
                .send(
                    `**\`${command.name}\`** komutu başarıyla yeniden yüklendi!`
                )
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                })
                .catch((err) => {
                    console.error(err);
                });
        } catch (error) {
            console.error(error);
            message.channel.send(
                `**\`${command.name}\`** komutu yüklenirken bir hata meydana geliyor.\nHata: ${error.message}`
            );
        }
    }
};
