const os = require('os');
const {
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ram")
    .setDescription("RAM usage information.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  
  execute: async function(interaction) {
    // Check for Administrator permission
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("Permission Denied")
        .setDescription("❌ You do not have permission to use this command.");

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    // Function to get memory usage
    const getMemoryUsage = () => {
      const totalMemory = (os.totalmem() / (1024 ** 3)).toFixed(2); // Total memory in GB
      const freeMemory = (os.freemem() / (1024 ** 3)).toFixed(2); // Free memory in GB
      const usedMemory = (totalMemory - freeMemory).toFixed(2); // Used memory in GB
      const percentUsed = ((usedMemory / totalMemory) * 100).toFixed(2); // Percentage of memory used

      return { totalMemory, freeMemory, usedMemory, percentUsed };
    };

    // Send initial memory usage
    let { totalMemory, freeMemory, usedMemory, percentUsed } = getMemoryUsage();
    let embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('RAM Usage')
      .addFields(
        { name: 'Used Memory', value: `${usedMemory} GB`, inline: true },
        { name: 'Total Memory', value: `${totalMemory} GB`, inline: true },
        { name: 'Memory Usage', value: `${percentUsed}%`, inline: true }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });

    // Update memory usage every 10 seconds
    const interval = setInterval(async () => {
      ({ totalMemory, freeMemory, usedMemory, percentUsed } = getMemoryUsage());
      embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('RAM Usage Updated')
        .addFields(
          { name: 'Used Memory', value: `${usedMemory} GB`, inline: true },
          { name: 'Total Memory', value: `${totalMemory} GB`, inline: true },
          { name: 'Memory Usage', value: `${percentUsed}%`, inline: true }
        )
        .setTimestamp();

      try {
        await interaction.editReply({ embeds: [embed] });
      } catch (error) {
        console.error("Failed to update RAM usage:", error);
        clearInterval(interval);
      }
    }, 5000);
  }
};
