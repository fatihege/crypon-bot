const db = require("wio.db");

module.exports = {
	name: "ban",
	description: "Bir üyeyi sunucudan engelleyin.",
	aliases: ["mban", "memberban", "uyeengelle", "uengelle"],
	args: true,
	usage: "<member> <reason>",
	guildOnly: true,
	permissions: 'BAN_MEMBERS',
	async run(message, args, client) {
		if (!message.mentions.users.size) {
			return message.reply("Lütfen engellemek istediğiniz üyeyi etiketleyin!");
		}
		const taggedUser = message.mentions.users.first();

		if (taggedUser.id == message.author.id) {
			return message.reply("Pişşt! Kendini engelleyemezsin.")
				.then(msg => {
					msg.delete({ timeout: 5000 });
				});
		}

		const prefix = await db.fetch("prefix_" + message.guild.id);

		if (args.length < 2) {
			return message.reply(`Lütfen gerekli argümanları belirt!\nBu komutun kullanımı: \`${prefix}${this.name} ${this.usage}\``);
		}

		const reason = args.slice(1).join(" ");

		try {
			message.guild.members.ban(taggedUser);
			message.channel.send(`**${taggedUser}** \`${reason}\` nedeniyle engellendi.`);
		} catch (error) {
			console.error(error);
			message.channel.send(`${taggedUser} engellenirken bir hata oluştu!`);
		}
	}
}