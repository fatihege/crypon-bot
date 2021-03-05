module.exports = {
    name: "setnickname",
    description: "Bir üyenin takma adını değiştirin.",
    aliases: ["setnick", "takmaad"],
    args: true,
    usage: "<member> <nickname>",
    guildOnly: true,
    permissions: "CHANGE_NICKNAME",
    run(message, args, client) {
        if (!message.mentions.members.first()) {
            return message.reply("Lütfen takma adı değiştirilecek üyeyi seç!")
                .then(msg => {
                    msg.delete({ timeout: 5000 });
                });
        }

				const tag = args.find(arg => arg.startsWith("<@"));
        var nick = args.join(" ").split(tag + " ").toString().trim().replace(",", "").replace(tag, "");
				const taggedMember = message.mentions.members.first();

				if (!nick || nick.trim() == "")  {
					return message.reply("Lütfen yeni takma adı girin!");
				}

        try {
						taggedMember.setNickname(nick);
            message.channel.send(`<@${taggedMember.id}> kullanıcısının takma adı başarıyla ${nick} olarak ayarlandı.`)
                .then(msg => {
                    msg.delete({ timeout: 5000 });
                });
        } catch (error) {
            console.error(error);
            message.channel.send("Üyenin takma adı ayarlanırken bir sorun ile karşılaşıldı.");
				}
    }
}
