module.exports = {
    name: "setnickname",
    description: "Bir üyenin takma adını değiştirin.",
    aliases: ["setnick", "takmaad"],
    args: true,
    usage: "<üye-id> <takma-ad>",
    guildOnly: true,
    permissions: "CHANGE_NICKNAME",
    run(message, args, client) {
        if (!args.length || args.length < 2) {
            return message
                .reply("Bu komut en az 2 argüman alıyor!")
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
        }

        const memberid = args[0];
        var nick = args
            .join(" ")
            .split(memberid + " ")
            .toString()
            .trim()
            .replace(",", "")
            .replace(memberid, "");
        const member = message.guild.members.cache.find(
            (member) => member.id == memberid
        );

        if (!nick || nick.trim() == "") {
            return message.reply("Lütfen yeni takma adı girin!");
        }

        try {
            member.setNickname(nick);
            message.channel
                .send(
                    `<@${member.id}> kullanıcısının takma adı başarıyla **${nick}** olarak ayarlandı.`
                )
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
        } catch (error) {
            console.error(error);
            message.channel.send(
                "Üyenin takma adı ayarlanırken bir sorun ile karşılaşıldı."
            );
        }
    }
};
