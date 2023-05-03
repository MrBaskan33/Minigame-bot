const { ActivityType, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js")
require('advanced-logs')

module.exports = {
  name: 'ready',
  execute(client) {
    console.success(` `, ` ${client.user.username} aktif.`)
    client.user.setPresence({
      activities: [
        {
          name: `Oyun`, 
          type: ActivityType.Playing
        }
      ]
    })
    client.user.setStatus(`idle`)
  }
}
