const Discord = require('discord.js');

exports.run = (client, message, args) => {
	let mesaj = args.slice(0).join(' ');
	if (mesaj.length < 1) return message.reply('**Kime Kurabiye Vereceğini Yazmadın!**');
    const embed = new Discord.RichEmbed()
    .setAuthor('')
    .setColor(0x000080)
    .setDescription(`** ${mesaj} ` + message.author.username + ' Sana :cookie: Verdi!**')
    return message.channel.sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kurabiye',
  description: 'İstediğiniz Kişiye Kurabiye Verirsiniz.',
  usage: 'kurabiye'
};
