const translate = require('../language/translate');

module.exports = {
	name: 'love',
	description: null,
	aliases: ['sevgi'],
	args: true,
	usage: null,
	guildOnly: false,
	permissions: null,
	run(message, args, client) {
		this.description = translate(message, 'commands.love.description');
		this.usage = translate(message, 'commands.love.usage');

		let member;
		if (!message.mentions.members.size) {
			member = message.guild.members.cache.find((member) => member.id == args[0]);
		} else {
			member = message.mentions.members.first();
		}

		if (!member) {
			return message.reply(translate(message, 'commands.love.messages.memberRequired')).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}

		if (member.id == message.author.id) {
			return message.reply(translate(message, 'commands.love.messages.notYourself')).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}

		let loveRate = Math.floor(Math.random() * 11);
		if (loveRate > 10) {
			loveRate = 10;
		} else if (loveRate < 0) {
			loveRate = 0;
		}

		let unloveRate = 10 - loveRate;

		let embed = {
			color: 0xff14b9,
			title: `${message.author.username} **-** ${member.user.username}`,
			description: '',
		};

		if (loveRate < 1) {
			embed.description += translate(message, 'commands.love.messages.first');
		} else if (loveRate < 3) {
			embed.description += translate(message, 'commands.love.messages.second');
		} else if (loveRate < 5) {
			embed.description += translate(message, 'commands.love.messages.third');
		} else if (loveRate < 7) {
			embed.description += translate(message, 'commands.love.messages.fourth');
		} else if (loveRate < 10){
			embed.description += translate(message, 'commands.love.messages.fifth');
		} else {
			embed.description += translate(message, 'commands.love.messages.sixth');
		}

		for (let i = 0; i < loveRate; i++) {
			embed.description += ':heart: ';
		}
		for (let i = 0; i < unloveRate; i++) {
			embed.description += ':white_heart: ';
		}

		message.channel.send({ embed: embed });
	},
};
