const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = async (Bastion, message) => {
  try {
    let spinning = await message.channel.send({
      embed: {
        color: 0x00AE86,
        description: `${message.author.tag} bir stres çarkı çeviriyor...`,
        image: {
          url: 'https://i.imgur.com/KJJxVi4.gif'
        }
      }
    });

    let timeout = (Math.random() * (60 - 5 + 1)) + 5;
    setTimeout(() => {
      spinning.edit({
        embed: {
          color: 0x00AE86,
          description: `${message.author.tag}, stres çarkın ${timeout.toFixed(2)} saniye döndü.`
        }
      }).catch(e => {
        Bastion.log.error(e);
      });
    }, timeout * 1000);
  }
  catch (e) {
    Bastion.log.error(e);
  }
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'stresçarkı',
  description: 'Stres çarkı çevirir.',
  usage: 'stresçarkı'
};