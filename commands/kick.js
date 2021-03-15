const db = require('wio.db');
const translate = require('../language/translate');

module.exports = {
	name: 'kick',
	description: null,
	aliases: ['mkick', 'uyeat'],
	args: true,
	usage: null,
	guildOnly: true,
	permissions: 'KICK_MEMBERS',
	async run(message, args, client) {
		this.description = translate(message, 'commands.kick.description');
		this.usage = translate(message, 'commands.kick.usage');

		let userid;

		if (message.mentions.members.size) {
			userid = message.mentions.members.first().id;
		} else {
			userid = args[0];
		}

		const user = message.guild.members.cache.find((m) => m.id == userid);

		if (!user) {
			return message.channel.send(translate(message, 'commands.kick.messages.memberNotExists')).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}

		if (user.id == client.user.id) {
			return message.reply(translate(message, 'commands.kick.messages.cannotKickCrypon')).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}

		if (user.id == message.author.id) {
			return message.channel.send(translate(message, "commands.kick.messages.cannotKickYourself"))
				.then((msg) => {
					msg.delete({ timeout: 5000 });
				});
		}

		if (user.hasPermission('ADMINISTRATOR')) {
			return message.reply(translate(message, 'commands.kick.messages.memberIsAdmin')).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}

		const reason = args.slice(1).join(' ') || null;

		try {
			user.kick(reason);
			if (reason) {
				return message.channel
					.send(translate(message, 'commands.kick.messages.memberIsKickedWithReason', user.id, reason))
					.then((msg) => {
						msg.delete({ timeout: 5000 });
					});
			} else {
				return message.channel
					.send(translate(message, 'commands.kick.messages.memberIsKicked', user.id))
					.then((msg) => {
						msg.delete({ timeout: 5000 });
					});
			}
		} catch (error) {
			if (error) {
				console.error(error);
				message.channel.send(translate(message, "commands.kick.messages.errorOccurred", user.id)).then((msg) => {
					msg.delete({ timeout: 5000 });
				});
			}
		}
	},
};
