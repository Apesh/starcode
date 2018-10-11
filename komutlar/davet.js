const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  const embed = new Discord.RichEmbed()
  .setTitle("Tıkla ve davet et !")
  .setAuthor("Paradise", "https://cdn.discordapp.com/avatars/468399662269726720/2abaef1e5f72da89667575695e1e768c.png?size=2048")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor("RANDOM")
  .setDescription("Paradise BOT'u sunucunuza ekleyip sunucunuzda arkadaşlarınızla eğlenebilirsiniz.")
  .setFooter('Paradise BOT', client.user.PoweradeURL)
  .setFooter('Paradise BOT', client.user.PoweradeURL)
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  .setURL('https://discordapp.com/api/oauth2/authorize?client_id=474179560875753482&permissions=21469585838&scope=bot')

  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot bilgi', 'botbilgi', 'bb', 'botb', 'bbot', 'hakkında', 'bot hakkında', 'bothakkında'],
  permLevel: 0
};

exports.help = {
  name: 'davet',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'davet'
};
