const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require ("discord.js")
const { JsonDatabase } = require("wio.db")
const Emoji = require("../Bot/Emojiler.json")
const Renk = require("../Bot/Renkler.json")
const { sahipid } = require("../ayarlar.json")
const { TwoZeroFourEight } = require('discord-gamecord')

module.exports = {
  slash: true,
  cooldown: 30,
  data: new SlashCommandBuilder()    
    .setName('2048')
    .setDescription('2048 oyununu oynarsınız.')
    .setDMPermission(false),
    
async execute(client, interaction) { 

  await interaction.deferReply()
  const db = new JsonDatabase({databasePath: `./Database/Database.json`})
  
  const Oyun = new TwoZeroFourEight({
    message: interaction,
    slash_command: true,
    timeoutTime: 60000,
    buttonStyle: 'PRIMARY',
    playerOnlyMessage: '**2048** oyununu şuanda {player} oynuyor.',
    embed: {
      title: '2048',
      color: Renk.Blurple
    },
    emojis: {
      up: '⬆️',
      down: '⬇️',
      left: '⬅️',
      right: '➡️'
    }
  })
  Oyun.startGame()
  Oyun.on('gameOver', Sonuç => {
    if(Sonuç.score > 0) db.add(`2048_${Sonuç.player.id}`, Sonuç.score)
  })
  
  }
}