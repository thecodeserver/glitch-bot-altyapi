const config = require("../ayarlar.json");
const chalk = require("chalk");

var prefix = config.prefix

module.exports = client => {
  console.log(chalk.yellow("Tüm komutlar yüklendi!"));

  let oyun = [
      "Bot Altyapı"
  ]

  setInterval(function() {

    var random = Math.floor(Math.random()*(oyun.length-0+1)+0);
    client.user.setActivity(oyun[random], "idle");
  }, 2 * 2500);

};