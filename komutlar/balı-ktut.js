const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
   message.channel.send(' ** Acaba Oltana Ne Takılacak :thinking: ** ').then(message => {
      var espriler = ['**Ağına Takılan: :tropical_fish: **','**Ağına Takılan:** :fish: ','**Ağına Takılan:** :blowfish: ','**Adam Balina Avladı Be!** :whale: '];
      var espri = espriler[Math.floor(Math.random() * espriler.length)];
            message.edit(`${espri}`);
 });
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'balıktut',
  description: 'Balık Tutarsınız.',
  usage: 'balıktut'
};
