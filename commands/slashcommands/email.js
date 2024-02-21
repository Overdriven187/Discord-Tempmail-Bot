const {SlashCommandBuilder} = require("@discordjs/builders");
const {PermissionsBitField, EmbedBuilder, Modal, TextInputComponent, MessageActionRow, MessageButton, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder} = require("discord.js");
module.exports = {data: (new SlashCommandBuilder).setName("email").setDefaultMemberPermissions(PermissionFlagsBits.Administrator).setDescription("Services Panel."), execute: async function (_0x3082x1, _0x3082x2) {
  if (!_0x3082x1.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    const _0x3082x3 = (new EmbedBuilder).setThumbnail(_0x3082x2.user.displayAvatarURL()).setColor("Cyan").setTitle(_0x3082x2.user.username).setDescription("❌ You can't use that command!").setTimestamp().setFooter({text: _0x3082x1.member.user.username, iconURL: _0x3082x1.member.user.displayAvatarURL()});
    return _0x3082x1.reply({embeds: [_0x3082x3]});
  }
  _0x3082x1.reply({content: "Sending...", ephemeral: true});
  const _0x3082x4 = (new ActionRowBuilder).addComponents((new StringSelectMenuBuilder).setCustomId("services").setPlaceholder("Select An Service").addOptions({label: "Temporarily Email", description: "Generate Fresh Email For 1 Hour", value: "gerar_email"}));
  const _0x3082x5 = (new EmbedBuilder).setColor("#0000FF").setAuthor({name: _0x3082x2.user.username, iconURL: _0x3082x2.user.displayAvatarURL()}).setDescription("> **Welcome to our panel.**\n\n**To start using our bot, read the instructions below.**\n> ``1`` • Select a service from us below\n> ``2`` • Wait for the bot to do the service for you").setImage("https://cdn.discordapp.com/attachments/1058265336039878716/1066097839568076963/Logo_Gmail_2015-2020.svg.png");
  _0x3082x1.channel.send({embeds: [_0x3082x5], components: [_0x3082x4]});
}};
