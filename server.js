const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
const {prefix, adminID, token} = require('./ayarlar.json');
const fs = require('fs');
const {getRandomNumber} = require('./util/Util.js')
require("./util/eventLoader")(client);

const log = message => {
  console.log(message);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(chalk.yellow(`${files.length} komut yüklenecek.`));
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(chalk.cyan(`Yüklenen komut: ${props.help.name}.`));
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.on('ready', () => {
  console.log(chalk.yellow(`${client.user.tag} göreve hazır!`));
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'selamun aleyküm') {
    msg.reply('Aleyküm Selam');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix) {
    msg.channel.send('**Nasıl yardımcı olabilirim?**');
  }
});

client.on('message', message => {
  if(message.content.toLowerCase() === `<@!738416853738848309>`) {
    message.channel.send('Bot prefixim: ' + `**${prefix}**`)
  }
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlevel = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlevel = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlevel = 3;
  if (message.author.id === adminID) permlevel = 4;
  return permlevel;
};

client.login(token);