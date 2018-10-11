const Discord = require('discord.js');
const Jimp = require('jimp');

exports.run = (client, message, args) => {
    var figlet = require('figlet');
    figlet(args.join(' '), function (err, data) {
      if (err) {
        console.log('Yazdığınız şeylere lütfen dikkat edin!');
        console.dir(err);
        return;
      }
      message.delete()
      const embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('Avatar Bot Community')
      .setDescription('```fix\n' + data + '\n```')
      .setFooter('Avatar BOT', client.user.avatarURL)
      .setTimestamp()
      message.channel.send(embed);
        });
    };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['a', 'asc'],
  permLevel: 0
};

exports.help = {
  name: 'ascii',
  description: 'İstediğiniz şeyi bota yazdırır.',
  usage: 'ascii [yazdırmak istediğiniz şey]'
};
