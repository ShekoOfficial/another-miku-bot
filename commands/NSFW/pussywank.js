const Discord = require("discord.js");
const nekoclient = require("nekos.life");
const neko = new nekoclient();

exports.run = async (bot, message, args) => {
  const filter = (reaction, user) =>
    reaction.emoji.name === "🔄" && user.id === message.author.id;
  if (!message.channel.nsfw)
    return message.channel
      .send("Please use **NSFW** Channel.")
      .then(m => m.delete(3000));
  const pending = message.channel.send("**Getting Data...**");
  const reply = await pending;
  const image = await neko.nsfw.pussyWankGif();
  const embed = new Discord.MessageEmbed()
    .setAuthor("Miku -- Pussy Wank")
    .setColor(0x1a9ca8)
    .setImage(image.url)
    .setFooter(
      `nekos.life | react with 🔄 within 10 seconds to generate new image.`
    );
  reply.edit({ embed }).then(m => {
    const collector = m.createReactionCollector(filter);
    m.react("🔄").then(_ => {
      let y = setTimeout(() => {
        collector.stop();
      }, 10000);
      collector.on("collect", r => {
        clearTimeout(y);
        embed.setDescription("**Getting Data...**");
        embed.setImage("");
        reply.edit({ embed });
        neko.nsfw.pussyWankGif().then(img => {
          embed.setDescription("");
          embed.setImage(img.url);
          reply.edit({ embed });
        });
        y = setTimeout(() => {
          collector.stop();
        }, 10000);
      });
      collector.on("end", collected => {
        m.clearReactions();
        embed.setFooter("nekos.life | timed out!");
        reply.edit({ embed });
      });
    });
  });
};

exports.conf = {
  aliases: ["wpussy", "pussyw"],
  cooldown: 2,
  guildOnly: true
};

exports.help = {
  name: "pussywank",
  category: "NSFW",
  description: "Print out wanked pussy images.",
  usage: "pussywank",
  param: "",
  aliases: "wpussy, pussyw"
};
