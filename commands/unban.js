module.exports = {
    name: "unban",
    description: "Bir kullanıcının engelini kaldırın.",
    aliases: ["userunban", "kullaniciengelkaldir"],
    args: true,
    usage: "<user-id>",
    guildOnly: true,
    permissions: "BAN_MEMBERS",
    run(message, args, client) {
        if (!args.length) {
            return message.reply(
                "Lütfen engelini kaldırmak istediğiniz üyenin ID'sini belirt!"
            );
        }
        try {
            message.guild.members.unban(args[0]);
            message.channel
                .send(
                    `<@${args[0]}> kullanıcısının yasağı başarıyla kaldırıldı!`
                )
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
        } catch (error) {
            message.channel
                .send(`Kullanıcının engeli kaldırılırken bir sorun oluştu.`)
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
            console.error(error);
        }
    }
};
