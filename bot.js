const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} Komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply(':star2: Aleyküm Selam Güzel Kardeşim Hoşgeldin :revolving_hearts: ');
  }
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(' ')[0];
  command = command.slice(prefix.length);

  let args = message.content.split(' ').slice(1);

  if (command === 'bug-gönder' || command === 'bug') {
    let str = '<@324641670132137985>';
    let id = str.replace(/[<@!>]/g, '');
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.reply(`Bulduğunuz bug nedir?`);
    message.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('<:ballot_box_with_check:324641670132137985> Bug bildirildi! Bug bildirdiğiniz için teşekkür ederiz!'));
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Tavsiye bilgileri;')
    .addField('Tavsiye:', mesaj, true)
    .addField('Kullanıcı adı:', message.author.tag, true)
    .addField('Kullanıcı kimliği:', message.author.id, true)
    .addField('Sunucu adı:', message.guild.name, true)
    .addField('Sunucu kimliği:', message.guild.id, true)
    client.fetchUser(id)
    .then(user => {user.send({embed})})
  }
});

const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube('AIzaSyDMRKZNkx3im4MRwRSbt-rswib5Qq0qdPU');
const queue = new Map();

var servers = {};
var prefix = 's!';
client.on("message", async message => {
    var args = message.content.substring(prefix.length).split(" ");
    if (!message.content.startsWith(prefix)) return;
  var searchString = args.slice(1).join(' ');
	var url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	var serverQueue = queue.get(message.guild.id);
    switch (args[0].toLowerCase()) {
      case "oynat":
    var voiceChannel = message.member.voiceChannel;
		if (!voiceChannel) return message.channel.send(':x: Lütfen Sesli Bir Kanala Giriniz.');
		var permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send(':x: Odaya Girme Yetkim Yok');
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send(':x: Kanalda Konuşma Yetkim Yok');
		}
      if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			var playlist = await youtube.getPlaylist(url);
			var videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				var video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return message.channel.send(`Oynatma Listesi: **${playlist.title}** Listeye Eklendi`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					var index = 0;
					message.channel.send(`
__**Şarkı Listesi:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Lütfen Hangi Şarkıyı Seçmek İstiyosan 1'den 10'a Kadar Bir Sayı Yaz.
					`);
					// eslint-disable-next-line max-depth
					try {
						var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send(':x: Geçersiz Değer Girildi.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send(':x: Arama Sonucu Elde Edemedim');
				}
			}
			return handleVideo(video, message, voiceChannel);
		}
        break;
      case "geç":
		if (!message.member.voiceChannel) return message.channel.send(':x: Sesli Kanalda Değilsin.');
		if (!serverQueue) return message.channel.send(':x: Şarkı Çalmıyor.');
		serverQueue.connection.dispatcher.end(':white_check_mark: Şarkı Başarıyla Geçildi');
		return undefined;
break;
      case "kapat":
		if (!message.member.voiceChannel) return message.channel.send(':x: Sesli Kanalda Değilsin.');
		if (!serverQueue) return message.channel.send(':x: Şarkı Çalmıyor.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end(':white_check_mark:  Şarkı Başarıyla Kapatıldı');
		return undefined;
break;
      case "ses":
		if (!message.member.voiceChannel) return message.channel.send(':x: Sesli Kanalda Değilsin.');
		if (!serverQueue) return message.channel.send(':x: Şarkı Çalmıyor.');
		if (!args[1]) return msg.channel.send(`Şimdiki Ses Durumu: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send(`Yeni Ses Durumu: **${args[1]}**`);
break;
      case "çalınan":
		if (!serverQueue) return message.channel.send(':x: Şarkı Çalmıyor.');
		return message.channel.send(`Şuanda Çalınan Şarkı İsmi: **${serverQueue.songs[0].title}**`);
break;
      case "şarkılistesi":
		if (!serverQueue) return message.channel.send(':x: Şarkı Çalmıyor.');
		return message.channel.send(`
__**Şarkı Listesi:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Şuanda Çalınan:** ${serverQueue.songs[0].title}
		`);
break;
      case "durdur":
      if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
			return message.channel.send('Şarkı Başarıyla Durduruldu!');
		}
		return message.channel.send(':x: Şarkı Çalmıyor.');
break;
      case "devamet":
      if (serverQueue && !serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
			return message.channel.send('Şarkı Devam Ettiriliyor!');
		}
		return message.channel.send(':x: Şarkı Çalmıyor.');
	

	return undefined;
break;
}
async function handleVideo(video, message, voiceChannel, playlist = false) {
	var serverQueue = queue.get(message.guild.id);
	console.log(video);
	var song = {
		id: video.id,
		title: video.title,
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		var queueConstruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(message.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`:x: Ses Kanalına Giremedim HATA: ${error}`);
			queue.delete(message.guild.id);
			return message.channel.send(`:x: Ses Kanalına Giremedim HATA: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return message.channel.send(`Şarkı Listesine **${song.title}** Adlı Bir Şarkı Eklendi.`);
	}
	return undefined;
}
  function play(guild, song) {
	var serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'İnternetten Kaynaklı Bir Sorun Yüzünden Şarkılar Kapatıldı.') console.log('Şarkılar Bitti..');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`Çalınan Şarkı: **${song.title}**`);
}
});

     client.on('guildMemberAdd', member => {
  let guild = member.guild;
  let joinRole = guild.roles.find('name', 'Misafir');
  member.addRole(joinRole);

  const channel = member.guild.channels.find('name', 'giris-cıkıs');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(member.user.username, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setTitle('📥 | Köye Yeni Bir Meydan Okuyucu Giriş Yaptı !')
  .setDescription(`Yeni Kişi Sayısı : ${message.guild.memberCount}`)
  .setTimestamp()
  channel.sendEmbed(embed); // belirlediğimiz kanala mesaj gönderelim.
});

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', 'giris-cıkıs');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(member.user.username, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setTitle('📤 | Sunucudan Bir Meydan Okuyucu Köyü Terk Etti !')
  .setDescription(`Kalan Kişi Sayısı : ${message.guild.memberCount}`)
  .setTimestamp()
  channel.sendEmbed(embed); 
});

client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;

  let command = message.content.split(' ')[0];
  command = command.slice(ayarlar.prefix.length);

  let args = message.content.split(' ').slice(1);

  if (command === 'topla') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p+c);
    message.channel.sendMessage(`${total}`);
  }
  if (command === 'çıkar') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p-c);
    message.channel.sendMessage(`${total}`);
  }
  if (command === 'çarp') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p*c);
    message.channel.sendMessage(`${total}`);
  }
  if (command === 'böl') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p/c);
    message.channel.sendMessage(`${total}`);
  }
});

client.on('message', msg => {
 if(msg.content.startsWith(prefix + "kurucu")) {
  msg.channel.sendMessage(`**${msg.guild.name}** adlı Discord sunucusunun kurucusu; ${msg.guild.owner} adlı kullanıcıdır.`)
}
});

client.on('guildCreate', guild => {
  const channel = member.guild.channels.find('name', 'giris-cıkıs');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle('Sunucuya katıldı;')
  .setDescription(`Bot, 》${guild.name}《 adlı sunucuya katıldı [${guild.memberCount} üye]!`)
  .setFooter('Avatar', client.user.avatarURL)
  .setTimestamp()
});

client.on('guildDelete', guild => {
  const channel = member.guild.channels.find('name', 'giris-cıkıs');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle('Sunucudan ayrıldı;')
  .setDescription(`Bot, 》${guild.name}《 adlı sunucudan ayrıldı [${guild.memberCount} üye]!`)
  .setFooter('Avatar', client.user.avatarURL)
  .setTimestamp()
});

client.login(ayarlar.token);
