const Discord = require('discord.js');

exports.run = (client, message, params) => {
  message.channel.send('**Para Atıldı!**')
    number = 8,2,4,1,5,6,7,10,12,13,15,11,8,9,14,19,20,17,16
    var random = Math.floor(Math.random() * (number - 1 + 20)) + 0; 
    switch(random) {
        case 1: message.channel.send('Para **Yazı** Üstünde Durdu'); break;
        case 2: message.channel.send('Para **Tura** Üstünde Durdu'); break;
        case 3: message.channel.send('Para **Yazı** Üstünde Durdu'); break;
        case 4: message.channel.send('Para **Tura** Üstünde Durdu'); break;
        case 5: message.channel.send('Para **Yazı** Üstünde Durdu'); break;
        case 6: message.channel.send('Para **Tura** Üstünde Durdu'); break;
        case 7: message.channel.send('Para **Yazı** Üstünde Durdu'); break;
        case 8: message.channel.send('Para **Tura** Üstünde Durdu'); break;
        case 9: message.channel.send('Para **Yazı** Üstünde Durdu'); break;
        case 10: message.channel.send('Para **Tura** Üstünde Durdu'); break;
        case 11: message.channel.send('Para **Yazı** Üstünde Durdu'); break;
        case 12: message.channel.send('Para **Tura** Üstünde Durdu'); break;
        case 13: message.channel.send('Para **Yazı** Üstünde Durdu'); break;
        case 14: message.channel.send('Para **Tura** Üstünde Durdu'); break;
        case 15: message.channel.send('Para **Yazı**  Üstünde Durdu'); break;
        case 16: message.channel.send('Para **Tura**  Üstünde Durdu'); break;
        case 17: message.channel.send('Para **Yazı**  Üstünde Durdu'); break;
        case 18: message.channel.send('Para **Tura**  Üstünde Durdu'); break;
        case 19: message.channel.send('Para **Yazı**  Üstünde Durdu'); break;
        case 20: message.channel.send('Para **Tura**  Üstünde Durdu'); break;
};
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yazıtura'],
  permLevel: 0
};

exports.help = {
  name: 'yazı-tura',
  description: 'Para Atar',
  usage: 'yazıtura'
};