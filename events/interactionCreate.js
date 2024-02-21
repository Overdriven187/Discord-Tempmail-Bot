const config = require("../config.json");
const {EmbedBuilder, AttachmentBuilder, ChannelType, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, ModalBuilder, TextInputBuilder, TextInputStyle, StringSelectMenuBuilder} = require("discord.js");
const ms = require("ms");
const tempmail = require("tempmail.lol");
module.exports = {name: "interactionCreate", execute: async function (_0x239fx4, _0x239fx5) {
  if (!_0x239fx4.guild || _0x239fx4.user.bot) {
    return;
  }
  if (_0x239fx4.isCommand()) {
    const _0x239fx6 = _0x239fx5.commands.get(_0x239fx4.commandName);
    if (!_0x239fx6) {
      return;
    }
    try {
      await _0x239fx6.execute(_0x239fx4, _0x239fx4.client);
    } catch (error) {
      console.log(`${""}${error}${""}`);
      await _0x239fx4.reply({content: "An unexpected error occurred report in <#1015213311740100638>", ephemeral: true});
    }
  }
  if (_0x239fx4.customId === "deletar") {
    _0x239fx4.channel.delete();
  }
  if (_0x239fx4.customId === "services") {
    const _0x239fx7 = _0x239fx4.values;
    if (_0x239fx7 == "gerar_email") {
      if (_0x239fx4.guild.channels.cache.find(_0x239fx8 => {
        return _0x239fx8.topic == _0x239fx4.member.user.id;
      })) {
        const _0x239fx9 = (new ActionRowBuilder).addComponents((new StringSelectMenuBuilder).setCustomId("services").setPlaceholder("Select a Service").addOptions({label: "Temporarily Email", description: "Generate Fresh Email For 1 Hour", value: "gerar_email", emoji: "📩"}));
        await _0x239fx4.deferUpdate();
        await _0x239fx4.editReply({components: [_0x239fx9]});
        let _0x239fxa = (new EmbedBuilder).setColor("Red").setDescription(`${"❌ You already have an email created"}`).setTimestamp();
        return _0x239fx4.followUp({embeds: [_0x239fxa], ephemeral: true});
      }
      const _0x239fx9 = (new ActionRowBuilder).addComponents((new StringSelectMenuBuilder).setCustomId("services").setPlaceholder("Select a Service").addOptions({label: "Temporarily Email", description: "Generate Fresh Email For 1 Hour", value: "gerar_email", emoji: "📩"}));
      await _0x239fx4.deferUpdate();
      await _0x239fx4.editReply({components: [_0x239fx9]});
      let _0x239fxb = _0x239fx4.guild.roles.cache.find(_0x239fxc => {
        return _0x239fxc.name === "@everyone";
      });
      await _0x239fx4.guild.channels.create({name: _0x239fx4.member.user.username, parent: config.categoria, topic: _0x239fx4.member.user.id, type: ChannelType.GuildText, permissionOverwrites: [{id: _0x239fxb.id, deny: [PermissionsBitField.Flags.ViewChannel]}, {id: _0x239fx4.member.user.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory], deny: [PermissionsBitField.Flags.SendMessages]}]}).then(async _0x239fx8 => {
        const _0x239fxd = (new ActionRowBuilder).addComponents((new ButtonBuilder).setLabel("Go to your email").setStyle(ButtonStyle.Link).setURL(`${"https://discord.com/channels/"}${_0x239fx4.guild.id}${"/"}${_0x239fx8.id}${""}`));
        let _0x239fxa = (new EmbedBuilder).setColor("Green").setTitle(_0x239fx5.user.username).setDescription(`${"✅ Email created successfully! <#"}${_0x239fx8.id}${">"}`).setTimestamp();
        _0x239fx4.followUp({embeds: [_0x239fxa], components: [_0x239fxd], ephemeral: true});
        tempmail.createInbox((_0x239fxd, _0x239fxe) => {
          if (_0x239fxe) {
            return console.error(_0x239fxe);
          }
          const _0x239fxf = (new ActionRowBuilder).addComponents((new ButtonBuilder).setCustomId(`${"cell"}`).setEmoji("📱").setStyle(ButtonStyle.Secondary), (new ButtonBuilder).setCustomId(`${"deletar"}`).setEmoji("🗑️").setStyle(ButtonStyle.Danger));
          const _0x239fx10 = Date.now() + ms("1h");
          const _0x239fx11 = new Date(_0x239fx10);
          const _0x239fx12 = Math.floor(_0x239fx11.getTime() / 1e3);
          let _0x239fx13 = (new EmbedBuilder).setColor("#303434").setTitle(_0x239fx5.user.username).setThumbnail(_0x239fx4.user.avatarURL()).setDescription(`${"***Your Temporarily Email***: `"}${_0x239fxd.address}${"`\n\**Expires in**: <t:"}${_0x239fx12}${":F>"}`).setTimestamp();
          _0x239fx8.send({components: [_0x239fxf], embeds: [_0x239fx13], content: `${"<@"}${_0x239fx4.user.id}${">"}`});
          const _0x239fx14 = _0x239fx8.createMessageComponentCollector({componentType: ComponentType.Button, time: 6e5, filter: _0x239fx15 => {
            return _0x239fx15.user.id === _0x239fx4.user.id && _0x239fx15.customId === `${"cell"}`;
          }});
          _0x239fx14.on("collect", async _0x239fx15 => {
            _0x239fx15.channel.send({content: `${""}${_0x239fxd.address}${""}`, ephemeral: true});
            _0x239fxf.components[0].setDisabled(true);
            await _0x239fx15.update({components: [_0x239fxf]});
          });
          let _0x239fx16 = 3600;
          let _0x239fx17 = setInterval(function () {
            tempmail.checkInbox(_0x239fxd.token, _0x239fx18 => {
              _0x239fx18.forEach(_0x239fx19 => {
                let _0x239fx13 = (new EmbedBuilder).setColor("#303434").setAuthor({name: _0x239fx19.from}).setTitle(_0x239fx19.subject).setDescription(_0x239fx19.body).setThumbnail("https://cdn.discordapp.com/attachments/1062470176534175796/1062519253770711082/Modmaill_1.png").setTimestamp();
                _0x239fx8.send({embeds: [_0x239fx13], content: `${"<@"}${_0x239fx4.user.id}${">"}`});
              });
            });
            if (!_0x239fx4.guild.channels.cache.find(_0x239fx8 => {
              return _0x239fx8.topic == _0x239fx4.member.user.id;
            })) {
              return clearInterval(_0x239fx17);
            }
            _0x239fx16--;
            if (_0x239fx16 === 0) {
              _0x239fx8.delete();
              return clearInterval(_0x239fx17);
            }
          }, 4e3);
        }, false);
      });
    }
  }
}};
