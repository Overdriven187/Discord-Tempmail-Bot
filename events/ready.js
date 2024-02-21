const {Client, GatewayIntentBits, ActivityType} = require("discord.js");
module.exports = {name: "ready", once: true, execute: async function (_0xa660x1) {
  console.log(`${"Successfully logged in to "}${_0xa660x1.user.tag}${""}`.green);
  _0xa660x1.user.setPresence({activities: [{name: `${"Email Generator"}`, type: ActivityType.Streaming, url: "https://twitch.tv/discord"}]});
}};
