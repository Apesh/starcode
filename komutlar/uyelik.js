const Discord = require('discord.js');

module.exports.run = async (client, msg, args) => {

    let kayıt = msg.guild.member(msg.mentions.users.first()) || msg.guild.member(args[0]);
    if (!kayıt) return msg.channel.send({
        embed: {
            color: Math.floor(Math.random() * (0xFFFFFF + 1)),
            description: ("📥 Kendini etiketlemelisin!")
        }
    })

    let role = msg.guild.roles.find(r => r.name === "Kayıtlı Üye");
    if (!role) {
        try {
            role = await msg.guild.createRole({
                name:  "Kayıtlı Üye",
                color: "#CCFF00",
                permission: []
            });

            msg.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                    SEND_MESSAGES: true,
                    ADD_REACTIONS: true
                });
            });
        } catch (e) {
            console.log(e.stack);
        }

    }

    if (kayıt.roles.has(role.id)) return msg.channel.send({
        embed: {
            color: Math.floor(Math.random() * (0xFFFFFF + 1)),
            description: (" 💡 Zaten önceden kayıt olmuşsun! ")
        }
    });

    await kayıt.addRole(role);
    msg.channel.send({
        embed: {
            color: Math.floor(Math.random() * (0xFFFFFF + 1)),
            description: ("🔑 Tebrikler kayıt oldunuz!")
        }
    })
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['register', 'kayıt-ol', 'qeydiyyat'],
    permLevel: 0
};

exports.help = {
    name: 'kayıt-ol',
    description: 'Sunucuya kayıt olursunuz!',
    usage: 'kayıt-ol'
};