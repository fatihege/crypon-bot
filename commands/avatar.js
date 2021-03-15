const translate = require('../language/translate');

module.exports = {
	name: 'avatar',
	description: null,
	aliases: ['uavatar', 'mavatar'],
	args: false,
	usage: null,
	guildOnly: false,
	permissions: null,
	run(message, args, client) {
		this.description = translate(message, 'commands.avatar.description');
		this.usage = translate(message, 'commands.avatar.usage');
		if (!message.mentions.users.size && args.length < 1) {
			const commandEmbed = {
				color: 0xe60ffa,
				title: translate(message, 'commands.avatar.messages.userAvatar'),
				description: message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }),
				image: {
					url: message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }),
				},
			};
			return message.channel.send({ embed: commandEmbed });
		}

		let userid;
		if (message.mentions.users.size) {
			userid = message.mentions.users.first().id;
		} else {
			userid = args[0];
		}

		const user = message.guild.members.cache.find((m) => m.id == userid);

		if (!user) {
			return message.channel.send(translate(message, 'commands.avatar.messages.memberNotExists')).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}

		if (message.author.username == user.username) {
			const commandEmbed = {
				color: 0xe60ffa,
				title: translate(message, 'commands.avatar.messages.userAvatar'),
				description: message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }),
				image: {
					url: message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }),
				},
			};
			return message.channel.send({ embed: commandEmbed });
		} else {
			const commandEmbed = {
				color: 0xe60ffa,
				title: translate(message, 'commands.avatar.messages.usersAvatar', user.user.username),
				description: user.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }),
				image: {
					url: user.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }),
				},
			};
			return message.channel.send({ embed: commandEmbed });
		}
	},
};
