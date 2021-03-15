const translate = require('../language/translate');

module.exports = {
	name: 'rmrole',
	description: null,
	aliases: ['removerole', 'rolkaldir'],
	args: true,
	usage: null,
	guildOnly: true,
	permissions: 'MANAGE_ROLES',
	run(message, args, client) {
		this.description = translate(message, 'commands.rmrole.description');
		this.usage = translate(message, 'commands.rmrole.usage');

		if (args.length > 2) {
			return message.channel.send(translate(message, 'commands.rmrole.messages.maxArgs')).then((msg) => {
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
			return message.channel.send(translate(message, 'commands.rmrole.messages.memberNotExists')).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}

		const taggedRole = message.guild.roles.cache.find((role) => role === message.mentions.roles.first());
		const admin = message.guild.members.cache.find((m) => m.hasPermission('ADMINISTRATOR'));

		if (admin.id == member.id && message.author.id != admin.id) {
			return message.reply(translate(message, 'commands.rmrole.messages.memberAdmin')).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}

		if (member.id == message.author.id && member.id != admin.id) {
			return message
				.reply(translate(message, 'commands.rmrole.messages.cannotRemoveFromYourself'))
				.then((msg) => {
					msg.delete({ timeout: 5000 });
				});
		}

		try {
			member.roles.remove(taggedRole);
			message.channel
				.send(translate(message, 'commands.rmrole.messages.roleRemoved', taggedRole, member.id))
				.then((msg) => {
					msg.delete({ timeout: 5000 });
				});
		} catch (error) {
			console.error(error);
			message.channel
				.send(translate(message, "commands.rmrole.messages.errorOccurred", taggedRole, member.id))
				.then((msg) => {
					msg.delete({ timeout: 5000 });
				});
		}
	},
};
