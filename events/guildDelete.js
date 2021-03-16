const db = require('wio.db');
const { webhookID, webhookToken } = require('../config.json');
const { WebhookClient, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'guildDelete',
	once: false,
	async run(guild) {
		if (guild) {
			// Delete prefix
			if (await db.fetch('prefix_' + guild.id)) {
				await db.delete('prefix_' + guild.id);
			}

			// Delete log channel
			if (await db.fetch('logch_' + guild.id)) {
				await db.delete('logch_' + guild.id);
			}

			// Delete welcome channel
			if (await db.fetch('welcomech_' + guild.id)) {
				await db.delete('welcomech_' + guild.id);
			}

			// Delete auto role channel
			if (await db.fetch('autorole_' + guild.id)) {
				await db.delete('autorole_' + guild.id);
			}
			
			const webhookClient = new WebhookClient(webhookID, webhookToken);
			const embed = {
				color: 0xff3b3b,
				title: 'Sunucudan Silindi',
				description: `**Sunucu Adı:** ${guild.name}\n**Sunucu ID:** ${guild.id}\n**Sunucu Sahibi:** ${guild.owner.user ? guild.owner.user.tag : "Bilinmiyor"}\n**Sunucu Sahibi ID:** ${guild.ownerID}\n**Sunucu Üye Sayısı:** ${guild.memberCount}`,
				timestamp: new Date(),
			};
			webhookClient.send("", {
				username: 'Crypon | Logger',
				avatarURL: "https://imgupload.io/images/2021/03/15/logger.png",
				embeds: [embed],
			});
		}
	},
};
