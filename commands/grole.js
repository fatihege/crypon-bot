const { botName } = require("../config.json");

module.exports = {
	name: "grole",
	description: "Belirlediğiniz üyeye istediğiniz rolü verin.",
	aliases: ["giverole", "rolver"],
	args: true,
	usage: "<member> <role>",
	guildOnly: true,
	permissions: "MANAGE_ROLES",
	run(message, args, client) {
		const member = message.mentions.members.first();
		const taggedRole = message.guild.roles.cache.find(role => role === message.mentions.roles.first());
		const botRole = message.guild.roles.cache.find(role => role.name == botName.toString());

		if (botRole && botRole.position < taggedRole.position) {
			return message.reply(`Bu işlemi gerçekleştirebilmem için benim rolümün daha yukarıda olması gerekiyor. Lütfen benim rolümü yukarıya al!`)
				.then(msg => {
					msg.delete({ timeout: 5000 });
				});
		}
        
		if (member == undefined) {
				return message.reply(`Lütfen geçerli bir üye etiketle!`);
		}

		if (taggedRole == undefined) {
			return message.reply(`Lütfen geçerli bir rol etiketle!`);
		}

		try {
				member.roles.add(taggedRole);
				message.channel.send(`${taggedRole} rolü ${member} üyesine **eklendi**.`)
					.then(msg => {
						msg.delete({ timeout: 5000 });
					});
		} catch (error) {
				console.error(error);
				message.channel.send(`${taggedRole} rolü ${member} üyesine eklenirken bir **sorun oluştu**.`);
		}

		message.delete({ timeout: 5000 });
	}
}