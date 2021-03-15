const db = require('wio.db');
const translate = require('../language/translate');

module.exports = {
	name: 'job',
	description: null,
	aliases: ['is', 'meslek'],
	args: false,
	usage: null,
	guildOnly: false,
	permissions: null,
	async run(message, args, client) {
		this.description = translate(message, 'commands.job.description');
		this.usage = translate(message, 'commands.job.usage');

		let member;
		if (!args[0] && !message.mentions.users.size) {
			member = message.author;
		} else if (message.mentions.users.size) {
			member = message.mentions.members.first();
		} else {
			member = message.guild.members.cache.find((member) => member.id == args[0]);
		}

		if (!member) {
			return message.channel.send(translate(message, 'commands.job.messages.memberNotExists')).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}

		let language;
		if (await db.fetch('lang_' + message.guild.id)) {
			language = await db.fetch('lang_' + message.guild.id);
		} else {
			language = 'tr';
		}

		const jobs = require(`../languages/${language}.json`).commands.job.messages.jobs;
		let job = jobs[Math.floor(Math.random() * jobs.length + 1)];
		if (!job) {
			job = jobs[jobs.length - 1];
		}

		const embed = {
			color: 0xe60ffa,
			title: translate(message, 'commands.job.messages.embedTitle', member.user ? member.user.username : member.username),
			description: translate(message, 'commands.job.messages.embedDescription', job),
		};

		message.channel.send({ embed: embed });
	},
};
