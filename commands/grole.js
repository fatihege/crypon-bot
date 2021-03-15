const { botName } = require('../config.json');
const translate = require('../language/translate');

module.exports = {
	name: 'grole',
	description: null,
	aliases: ['giverole', 'rolver'],
	args: true,
	usage: null,
	guildOnly: true,
	permissions: 'MANAGE_ROLES',
	run(message, args, client) {
		this.description = translate(message, 'commands.grole.description');
		this.usage = translate(message, 'commands.grole.usage');

		if (args.length > 2) {
			return message.channel.send(translate(message, 'commands.grole.messages.maxArgs')).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}
		let memberid;
		if (message.mentions.members.size) {
			memberid = message.mentions.members.first().id;
		} else {
			if (args[0].startsWith('<@')) {
				memberid = args[1];
			} else {
				memberid = args[0];
			}
		}
		const member = message.guild.members.cache.find((m) => m.id == memberid);
		if (!member) {
			return message.channel.send(translate(message, 'commands.grole.messages.memberNotExists')).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}
		const taggedRole = message.guild.roles.cache.find((role) => role === message.mentions.roles.first());
		const botRole = message.guild.roles.cache.find((role) => role.name == botName.toString());

		if (botRole && botRole.position < taggedRole.position) {
			return message.reply(translate(message, 'commands.grole.messages.rolePosition')).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}

		if (member == undefined) {
			return message.reply(translate(message, 'commands.grole.messages.validMember')).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}

		if (taggedRole == undefined) {
			return message.reply(translate(message, 'commands.grole.messages.validRole')).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}

		try {
			member.roles.add(taggedRole);
			message.channel
				.send(translate(message, 'commands.grole.messages.roleAdded', taggedRole, member.id))
				.then((msg) => {
					msg.delete({ timeout: 5000 });
				});
		} catch (error) {
			console.error(error);
			message.channel
				.send(translate(message, 'commands.grole.messages.errorOccurred', taggedRole, member.id))
				.then((msg) => {
					msg.delete({ timeout: 5000 });
				});
		}

		message.delete({ timeout: 5000 });
	},
};
