const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder, SlashCommandBuilder, Collection, ContextMenuCommandBuilder } = require ("discord.js")
const icooldown = new Collection()
const { sahipid } = require("../ayarlar.json")
const Emoji = require("../Bot/Emojiler.json")
const Renk = require("../Bot/Renkler.json")

module.exports = {
    name: 'interactionCreate',
    execute(interaction, client) {
      
    const command = client.slashcommands.get(interaction.commandName)
    if(!command) return
      
    //_____// Cooldown \\_____\\
      if(interaction.user.id !== sahipid) {
        if(!icooldown.has(interaction.commandName)) {
          icooldown.set(interaction.commandName, new Collection())
        }
        const now = Date.now()
        const timestampt = icooldown.get(interaction.commandName)
        const cooldownAmount = (command.cooldown) * 1000
        if(timestampt.has(interaction.user.id)) {
          const expiration = timestampt.get(interaction.user.id) + cooldownAmount
          if(now < expiration) {
            const timeleft = Math.round((expiration - now) / 1000)
            const embeduyarı = new EmbedBuilder()
              .setColor(Renk.Red)
              .setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
              .setTitle("Yavaşla")
              .setDescription(`Bu komutu tekrar kullanabilmek için **${timeleft} saniye** beklemelisin.`)
              .setTimestamp()
            interaction.reply({ embeds: [embeduyarı] })
            setTimeout(() => { interaction.deleteReply() }, expiration - now)
            return
          }
        } else {
          timestampt.set(interaction.user.id, now)
          setTimeout(() => timestampt.delete(interaction.user.id), cooldownAmount)
        }
      }
    //_____// Cooldown \\_____\\
    try {
      command.execute(client, interaction)
    } catch (error) {
      console.error(error)
    }
  }
}