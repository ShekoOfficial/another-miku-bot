const Discord = require('discord.js');
const usage = "mock <text>".split('').map(x => {
  var random = Math.round(Math.random());
  return x = random ? x.toLowerCase() : x.toUpperCase();
}).join('');

exports.run = async (bot, message, args) => {
  if (!args[0]) return message.channel.send("what u want".split('').map(x => {
    var random = Math.round(Math.random());
    return x = random ? x.toLowerCase() : x.toUpperCase();
  }).join(''));

  // starts here
  const mocked = args.join(" ").split('').map(x => {
    var random = Math.round(Math.random());
    return x = random ? x.toLowerCase() : x.toUpperCase();
  }).join('');

  // sends here
  const embed = new Discord.RichEmbed()
    .setAuthor("Miku -- Mock")
    .setColor("f2e160")
    .setImage("http://tinyurl.com/ybkjg49c")
    .setDescription(mocked)
    .setFooter(`-${message.author.tag}`);
  message.channel.send({
    embed
  });
};

exports.conf = {
  aliases: [],
  cooldown: 1
};

exports.help = {
  name: "mock",
  category: "Fun",
  description: "DESCRIPTION",
  usage: usage,
  param: "",
  aliases: ""
};