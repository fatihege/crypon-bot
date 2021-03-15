const db = require('wio.db');
const translate = require('../language/translate');

module.exports = {
	name: 'ban',
	description: null,
	aliases: ['mban', 'memberban', 'uyeengelle', 'uengelle'],
	args: true,
	usage: null,
	guildOnly: true,
	permissions: 'BAN_MEMBERS',
	async run(message, args, client) {
		this.description = translate(message, 'commands.ban.description');
		this.usage = translate(message, 'commands.ban.usage');

		let userid;
		if (message.mentions.users.size) {
			userid = message.mentions.users.first().id;
		} else {
			userid = args[0];
		}
		const user = message.guild.members.cache.find((member) => member.id == userid);
		if (!user) {
			return message.reply(translate(message, 'commands.ban.messages.memberNotExists')).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}

		if (user.id == message.author.id) {
			return message.reply(translate(message, 'commands.ban.messages.cannotBanYourself')).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}

		if (user.id == client.user.id) {
			return message.reply(translate(message, 'commands.ban.messages.cannotBanCrypon')).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}

		const prefix = await db.fetch('prefix_' + message.guild.id);
		const reason = args.slice(1).join(' ') || null;

		try {
			message.guild.members.ban(user, { reason: reason });
			if (reason) {
				message.channel
					.send(translate(message, 'commands.ban.messages.memberBannedWithReason', user.id, reason))
					.then((msg) => {
						msg.delete({ timeout: 5000 });
					});
			} else {
				message.channel.send(translate(message, 'commands.ban.messages.memberBanned', user.id)).then((msg) => {
					msg.delete({ timeout: 5000 });
				});
			}
		} catch (error) {
			console.error(error);
			message.channel.send(translate(message, 'commands.ban.messages.errorOccurred')).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}
	},
};
