const ownerID = require('../config.json').ownerID;
const {
  Canvas
} = require("canvas-constructor");
const {
  resolve,
  join
} = require("path");
const {
  Attachment
} = require("discord.js");
const {
  get
} = require("snekfetch");
const fsn = require('fs-nextra');

// Canvas.registerFont(resolve(join(__dirname, "./assets/whatever.ttf")), "Discord");
exports.run = async (bot, message, args) => {
  if (!message.author.id == ownerID || !message.author.id == '182531489773125632') return message.channel.send("You don\'t have permission to run this command(s).").then(r => r.delete(3000));

  async function brainy() {
    const img = await fsn.readFile('./images/brain4.png');
    const joined = args.join(" ").split(";");
    const first = joined[0];
    const second = joined[1];
    const third = joined[2];
    const fourth = joined[3];
    console.log(joined);
    console.log(first);
    console.log(second);
    console.log(third);
    return new Canvas(400, 500)
      .addImage(img, 0, 0, 400, 500)
      .setColor('#151515')
      .setTextFont('15px whatever')
      .setTextAlign('center')
      .addText(first, 100, 63)
      .addText(second, 100, 188)
      .addText(third, 100, 313)
      .addText(fourth, 100, 438)
      .toBufferAsync();
  }

  // STARTS HERE
  let now = Date.now();
  message.channel.send("**Rendering.....**").then(m => {
    m.edit(`\`${Date.now() - now}ms\``)
  }).then(await message.channel.send(new Attachment(await brainy(), `brainy-${message.author.id}.jpg`)));
};

exports.conf = {
  aliases: [],
  cooldown: 5
};

exports.help = {
  name: "brain",
  category: "**OWNER ONLY**",
  description: "",
  usage: ""
};