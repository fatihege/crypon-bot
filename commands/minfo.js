const translate = require('../language/translate');
const dateFormat = require('dateformat');
const db = require('wio.db');

module.exports = {
	name: 'minfo',
	description: null,
	aliases: ['memberinfo', 'uyebilgi', 'ubilgi'],
	args: false,
	usage: null,
	guildOnly: true,
	permissions: null,
	async run(message, args, client) {
		this.description = translate(message, 'commands.minfo.description');
		this.usage = translate(message, 'commands.minfo.usage');

		let language;
		if (message.guild && (await db.fetch('lang_' + message.guild.id))) {
			language = await db.fetch('lang_' + message.guild.id);
		} else if (
			message.channel &&
			message.channel.type == 'dm' &&
			(await db.fetch('lang_dm_' + message.channel.id))
		) {
			language = await db.fetch('lang_dm_' + message.channel.id);
		} else {
			language = 'tr';
		}
		const datetimeConf = require(`../languages/${language}.json`).basic.date.datetime;
		dateFormat.i18n = {
			dayNames: datetimeConf.dayNames,
			monthNames: datetimeConf.monthNames,
			timeNames: datetimeConf.timeNames,
		};

		let userid;
		if (message.mentions.users.size) {
			userid = message.mentions.users.first().id;
		} else {
			if (args.length) {
				userid = args[0];
			} else {
				userid = message.author.id;
			}
		}

		const user = message.guild.members.cache.find((m) => m.id == userid);

		if (!user) {
			return message.channel.send(translate(message, 'commands.minfo.messages.memberNotExists')).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}

		if (userid == message.author.id) {
			const member = message.guild.members.cache.find((m) => m.id == user.id).user;
			const userRegisteredAt = dateFormat(member.createdAt, 'd mmmm dddd yyyy, h.MM.ss TT');
			const userJoinedAt = dateFormat(user.joinedAt, 'd mmmm dddd yyyy, h.MM.ss TT');
			let commandEmbed = {
				color: 0xe60ffa,
				thumbnail: {
					url: user.user.displayAvatarURL({ format: 'png', dynamic: false }),
				},
				title: translate(message, "commands.minfo.messages.embedTitle", message.author.username),
				description: translate(message, "commands.minfo.messages.yourselfInfo", message.author.username, message.author.id, userRegisteredAt, userJoinedAt),
			};

			user.roles.cache.map((role) => {
				if (role.name[0] == '@') {
					commandEmbed.description += role.name;
				} else {
					commandEmbed.description += '<@&' + role.id + '>';
				}
			});

			message.channel.send({ embed: commandEmbed });
		} else {
			const member = message.guild.members.cache.find((m) => m.id == user.id).user;
			const userRegisteredAt = dateFormat(member.createdAt, 'd mmmm dddd yyyy, h.MM.ss TT');
			const userJoinedAt = dateFormat(user.joinedAt, 'd mmmm dddd yyyy, h.MM.ss TT');
			let commandEmbed = {
				color: 0xe60ffa,
				thumbnail: {
					url: user.user.displayAvatarURL({ format: 'png', dynamic: false }),
				},
				title: translate(message, "commands.minfo.messages.embedTitle", user.user.username),
				description: translate(message, "commands.minfo.messages.memberInfo", user.user.username, user.id, userRegisteredAt, userJoinedAt),
			};

			user.roles.cache.map((role) => {
				if (role.name[0] == '@') {
					commandEmbed.description += role.name;
				} else {
					commandEmbed.description += '<@&' + role.id + '>';
				}
			});

			message.channel.send({ embed: commandEmbed });
		}
	},
};
