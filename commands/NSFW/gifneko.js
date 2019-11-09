const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();

exports.run = async (bot, message, args) => {
  if (!message.channel.nsfw)
    return message.channel
      .send("**NSFW Channel Only.**")
      .then(m => m.delete(3000));
  const filter = (reaction, user) =>
    reaction.emoji.name === "🔄" && user.id === message.author.id;
  const reply = await message.channel.send("**Getting Data...**");
  const image = await neko.nsfw.nekoGif();
  const embed = new Discord.MessageEmbed()
    .setAuthor("Miku -- neko GIF")
    .setColor(0x1a9ca8)
    .setDescription(`[Click here to download](${image.url})`)
    .setImage(image.url)
    .setFooter(
      `nekos.life | react with 🔄 within 10 seconds to generate new image.`
    );
  reply.edit({ embed }).then(m => {
    const collector = m.createReactionCollector(filter);
    m.react("🔄").then(_ => {
      let stopper = setTimeout(() => {
        collector.stop();
      }, 10000);
      collector.on("collect", r => {
        clearTimeout(stopper);
        r.remove(message.author.id);
        embed.setDescription("**Getting Data...**");
        embed.setImage("");
        reply.edit({ embed });
        // generate new image
        neko.nsfw.nekoGif().then(newImage => {
          embed.setDescription(`[Click here to download](${newImage.url})`);
          embed.setImage(newImage.url);
          reply.edit({ embed });
          stopper = setTimeout(() => {
            collector.stop();
          }, 10000);
        });
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
  aliases: ["gneko", "nekog"],
  cooldown: 5,
  guildOnly: true
}

exports.help = {
  name: "nekogif",
  category: "NSFW",
  description: "Print out neko hentai gif Images.",
  usage: "nekogif",
  param: "",
  aliases: "gneko, nekog"
}
