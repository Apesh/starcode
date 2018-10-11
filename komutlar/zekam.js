const Discord = require('discord.js');

  exports.run = (client, message, args) => {
    var cevaplar = ['100', '101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117', '118',
     '119', '120', '121', '122', '123', '124', '125', '126', '127', '128', '129', '130', '131', '132', '133', '134', '135', '136', '137', '138',
      '139', '140', '141', '142', '143', '144', '145', '146', '147', '148', '149', '150', '151', '152', '153', '154', '155', '156', '157', '158',
       '159', '160', '161', '162', '163', '164', '165', '166', '167', '168', '169', '170', ];
    var cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)];
    message.reply(cevap);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['zekam', 'zeka'],
  permLevel: 0 ,
};

exports.help = {
  name: 'zekam',
  description: 'IQ Seviyenizi Tahmin Eder.',
  usage: 'zekam'
};
