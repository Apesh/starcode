const Discord = require('discord.js');
const moment = require('moment');

exports.run = (client, message, args) => {
 if (!message.guild) {
 const ozelmesajuyari = new Discord.RichEmbed()
 .setColor(0xFF0000)
 .setTimestamp()
 .setAuthor(message.author.username, message.author.avatarURL)
 .addField(' :warning: Hata! :warning: ', '`reboot` adlı komutu özel mesajlarda kullanamazsın. :angry: ')
 return message.author.sendEmbed(ozelmesajuyari); }
 message.channel.sendEmbed(new Discord.RichEmbed().setDescription('**BOT** **__Yeniden Başlatılsın Mı?__** **>>** `onay` **<<** ').setColor(0xff0000)).then(message => {
 message.channel.awaitMessages(response => response.content === "onay", {
   max: 1,
   time: 30000,
   errors: ['time'],
 })
 .then((collected) => {
     message.channel.sendEmbed(new Discord.RichEmbed().setDescription('**BOT:** `Komutlar hazır!` \n**BOT:** `Oynuyor ayarlandı.`').setColor(0xff0000).setColor(`https://tails.boum.org/contribute/how/promote/material/slides/IFF-20160306/11_restart.svg`)).then(message => {
     console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Bot yeniden başlatılıyor...`)
     process.exit(1);
   }).catch(console.error)
   })
   .catch(() => {
     message.channel.sendEmbed(new Discord.RichEmbed().setDescription('**BOT:** `İşlem İptal Edildi`'));
   });
});
};

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['restart', 'başlat', 'rb'],
 permLevel: 4
};

exports.help = {
 name: 'reboot',
 description: 'Botu yeniden başlatır.',
 usage: 'reboot'
};
