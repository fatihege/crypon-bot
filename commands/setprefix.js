const db = require("wio.db");

module.exports = {
	name: "sprefix",
	description: "Botun önekini değiştirin.",
	aliases: ["setprefix", "setpref", "prefixayarla"],
	args: true,
	usage: "<prefix>",
	guildOnly: true,
	permissions: "MANAGE_MESSAGES",
	async run(message, args, client) {
        try {
            await db.set("prefix_" + message.guild.id, args[0]);
            message.channel.send(`Prefix başarıyla \`${args[0]}\` olarak ayarlandı.`)
                .then(msg => {
                    msg.delete({ timeout: 5000 });
                });
        } catch (error) {
            console.error(error);
            message.channel.send("Prefix değiştirilirken bir hatayla karşılaşıyorum.");
        }
	}
}