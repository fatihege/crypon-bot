const translate = require('../language/translate');

module.exports = {
	name: 'invites',
	description: null,
	aliases: ['invs', 'davetler'],
	args: false,
	usage: null,
	guildOnly: true,
	permissions: null,
	run(message, args, client) {
		this.description = translate(message, "commands.invites.description");
		this.usage = translate(message, "commands.invites.usage");

		let userid;
		if (message.mentions.users.first()) {
			userid = message.mentions.users.first().id;
		} else if (args[0]) {
			userid = args[0];
		} else {
			userid = message.author.id;
		}

		const user = message.guild.members.cache.find((member) => member.id == userid);

		if (!user) {
			return message.channel
				.send(translate(message, 'commands.invites.messages.memberNotExists', message.author.id))
				.then((msg) => {
					msg.delete({ timeout: 5000 });
				});
		}

		message.guild.fetchInvites().then((invites) => {
			const userInvites = invites.array().filter((inv) => inv.inviter.id == userid);
			var userInvitesCount = 0;
			userInvites.forEach((invite) => (userInvitesCount += parseInt(invite.uses)));
			const embed = {
				color: 0xff14b9,
				title: translate(message, "commands.invites.messages.embedTitle", user.user.tag),
				description: translate(message, "commands.invites.messages.embedDescription", userid, userInvitesCount),
			};
			message.channel.send({ embed: embed });
		});
	},
};
