module.exports = {
    name: "invites",
    description: "Bir üyenin kaç kişiyi davet ettiğini görün.",
    aliases: ["invs", "davetler"],
    args: false,
    usage: "<member[optional]>",
    guildOnly: true,
    permissions: null,
    run(message, args, client) {
        let userid;
        if (message.mentions.users.first()) {
            userid = message.mentions.users.first().id;
        } else if (args[0]) {
            userid = args[0];
        } else {
            userid = message.author.id;
        }

        const user = message.guild.members.cache.find(
            (member) => member.id == userid
        );

        if (!user) {
            return message.channel
                .send(`Hey <@${message.author.id}>, böyle bir kullanıcı yok!`)
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
        }

        message.guild.fetchInvites().then((invites) => {
            const userInvites = invites
                .array()
                .filter((inv) => inv.inviter.id == userid);
            var userInvitesCount = 0;
            userInvites.forEach(
                (invite) => (userInvitesCount += parseInt(invite.uses))
            );
            const embed = {
                color: 0xff14b9,
                title: `${user.user.username}#${user.user.discriminator} Kullanıcısının Davetleri`,
                description: `<@${userid}> kullanıcısının toplam **${userInvitesCount}** daveti var.`
            };
            message.channel.send({ embed: embed });
        });
    }
};
