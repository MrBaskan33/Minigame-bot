const { ActivityType, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js")
require('advanced-logs')
const { joinVoiceChannel } = require('@discordjs/voice')

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
    const Kanal = client.channels.cache.get("1091364613322461244")
    if(!Kanal) return
    joinVoiceChannel({channelId: Kanal.id, guildId: Kanal.guild.id, adapterCreator: Kanal.guild.voiceAdapterCreator, selfDeaf: false, selfMute:true})
  }
}
