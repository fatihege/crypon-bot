const db = require('wio.db');
const translate = require('../language/translate');

module.exports = {
	name: 'guildUpdate',
	once: false,
	async run(oldGuild, newGuild, client) {
		if (oldGuild) {
			if (await db.fetch('logch_' + oldGuild.id)) {
				const logChannel = await db.fetch('logch_' + oldGuild.id);
				const logch = oldGuild.channels.cache.find((ch) => ch.id === logChannel);

				const aChannel = oldGuild.channels.cache.first();

				let logEmbed = {
					color: 0xe60ffa,
					title: translate(aChannel, 'events.guildUpdate.messages.embedTitle'),
					description: ``,
				};

				if (oldGuild.name.toString() != newGuild.name.toString()) {
					logEmbed.description += translate(
						aChannel,
						'events.guildUpdate.messages.nameChange',
						oldGuild.name,
						newGuild.name
					);
				}

				if (oldGuild.region.toString() != newGuild.region.toString()) {
					const oldRegion = oldGuild.region.charAt(0).toUpperCase() + oldGuild.region.slice(1);
					const newRegion = newGuild.region.charAt(0).toUpperCase() + newGuild.region.slice(1);
					logEmbed.description += translate(
						aChannel,
						'events.guildUpdate.messages.regionChange',
						oldRegion,
						newRegion
					);
				}

				if (oldGuild.iconURL() != newGuild.iconURL()) {
					logEmbed.description += translate(
						aChannel,
						'events.guildUpdate.messages.iconChange',
						oldGuild.iconURL({ format: 'png', dynamic: false }) ? oldGuild.iconURL({ format: 'png', dynamic: false }) : translate(aChannel, "basic.no"),
						newGuild.iconURL({ format: 'png', dynamic: false }) ? newGuild.iconURL({ format: 'png', dynamic: false }) : translate(aChannel, "basic.no")
					);
				}

				return logch.send({ embed: logEmbed });
			}
		}
	},
};
