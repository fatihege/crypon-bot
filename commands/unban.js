const translate = require('../language/translate');

module.exports = {
	name: 'unban',
	description: null,
	aliases: ['userunban', 'kullaniciengelkaldir'],
	args: true,
	usage: null,
	guildOnly: true,
	permissions: 'BAN_MEMBERS',
	run(message, args, client) {
		this.description = translate(message, 'commands.unban.description');
		this.usage = translate(message, 'commands.unban.usage');

		if (isNaN(parseInt(args[0])) || args[0].length < 18) {
			return message.channel.send(translate(message, 'commands.unban.messages.memberNotExists')).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}

		message.guild.fetchBan(args[0]).then((ban) => {
			if (ban.user.id) {
				message.guild.members.unban(args[0]);
				return message.channel
					.send(translate(message, 'commands.unban.messages.successful', args[0]))
					.then((msg) => {
						msg.delete({ timeout: 5000 });
					});
			} else {
				return message.channel
					.send(translate(message, 'commands.unban.messages.memberNotBanned'))
					.then((msg) => {
						msg.delete({ timeout: 5000 });
					});
			}
		}).catch((err) => {
			console.error(err);
			return message.channel
				.send(translate(message, 'commands.unban.messages.memberNotBanned'))
				.then((msg) => {
					msg.delete({ timeout: 5000 });
				});
		})
	},
};
