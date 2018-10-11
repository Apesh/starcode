const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
  if (message.channel.type !== 'dm') {
    const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('**Komutlarımı DM Olarak Attım ! Özel mesajlarını kontrol etmeyi unutma ! :postbox: ** ');
    message.channel.sendEmbed(ozelmesajkontrol) }
    const pingozel = new Discord.RichEmbed()
    .setTitle(" ")
    .setAuthor(" ")
    .setColor("RANDOM")
    .addField("**[1]** Eğlence Komutları", `s!banned • Dene ve Gör! \ns!zekam • Zekanızı Gösterir \ns!balıktut • Balık Tutar \ns!mc-yaz • Yazdığınızı başarım olarak yazar \ns!kurabiye • Kurabiye Verir \ns!ascii • Yazdığın Yazıyı Ascii Olarak Yazar (Hatalı) \ns!stresçarkı • StresÇarkı Döndürür Ve Kaç Saniye Döndüğünü Söler \ns!notum • Rastgele Not Söler \ns!slot • Slot Oynar \ns!google • Arattığınız Nesneyi Gösterir \ns!parti • Parti Gifi Atar \ns!avatarım • Avatarınınızı Gösterir. \ns!yazıtura • Yazı Tura Atar. \ns!uç • Uçan Tekme Atar \ns!atatürk • Şanlı Atatürk'ün Resmini Atar \ns!yala • Dondurma Yalar \ns!sigara • Sigara İçer. \ns!herkesebendençay • Herkese Çay Alırsınız. \ns!şanslısayım • Şans Sayınızı Gösterir. \ns!twerk • Twerk Gifi Atar \ns!koş • Koşarsınız. \ns!espri • BOT Espri Yapar. \ns!çayiç • Çay İçersiniz. \ns!çekiç • İstediğiniz Kişiye Çekiç Atarsınız. \ns!çayaşekerat • Çaya Şeker Atarsınız. \ns!yumruhs!at • Yumruk Atarsınız. \ns!say • Bota İstediğiniz Şeyi Yazdırırsınız. \ns!bulanık • Etiketlediğiniz Kişinin Avatarını  Bulanıklaştırır`)
    .addField("**[2]** Kullanıcı Komutları", `s!yardım • BOT Komutlarını Atar. \ns!hastebin • Hastebinde Kod Paylaşır \ns!bilgim • Bilgilerinizi Gösterir \ns!tavsiye • BOTa tavsiye verirsiniz. \ns!bilgi • BOT Kendisi Hakkında Bilgi Verir. \ns!saat • Türkiye Saatini Gösterir \ns!ping • BOT Gecikme Süresini Söyler. \ns!davet • BOT Davet Linkini Atar. \ns!istatistik • BOT İstatistiklerini Atar. \ns!sunucuresmi • BOT Sunucunun Resmini Atar. \ns!sunucubilgi • BOT Sunucu Hakkında Bilgi Verir.`)
    .addField("**[3]** Muzik Komutları", `s!oynat isim/url • İstediğiniz Şarkıyı Açar \ns!kapat • Açık Olan Şarkıyı Kapatır \ns!durdur • Şarkıyı Durdurur \ns!devamet • Şarkıyı Devam Ettirir \ns!geç • Başka Şarkıya Geçer \ns!ses • Şarkının Sesini Ayarlarsınız 1/100 \ns!şarkılistesi • Şarkı Listesini Gösterir \ns!çalınan • Çalınan Şarkıyı Gösterir`)
    .addField("**[4]** Yetkili Komutları", `s!ban • İstediğiniz Kişiyi Sunucudan Banlar. \ns!temizle • Mesajları Temizler \ns!kilit • chat kapatır!. \ns!uyar • Isdedginiz Kisiyi Uyarir \ns!kick • İstediğiniz Kişiyi Sunucudan Atar. \ns!unban • İstediğiniz Kişinin Yasağını Açar. \ns!sustur • İstediğiniz Kişiyi Susturur. \ns!oylama • Oylama Açar. \ns!duyuru • Güzel Bir Duyuru Görünümü Sağlar.`)
    .setFooter("")
    .setThumbnail("")
    .setTimestamp()
    return message.author.sendEmbed(pingozel)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['y'],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Botun komutlarını gösterir',
  usage: 'yardım'
};
