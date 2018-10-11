const Discord = require('discord.js')


exports.run = (client, message, args) => {
        message.delete();
    message.reply(':regional_indicator_a::regional_indicator_f::regional_indicator_k: **Oldu**')
}


exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: 0
};

exports.help = {
name: 'afk',
description: 'afk',
usage: 'afk'
};