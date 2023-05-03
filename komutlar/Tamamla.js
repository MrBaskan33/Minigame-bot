const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require ("discord.js")
const { JsonDatabase } = require("wio.db")
const Emoji = require("../Bot/Emojiler.json")
const Renk = require("../Bot/Renkler.json")
const { sahipid } = require("../ayarlar.json")
const { Flood } = require('discord-gamecord')

module.exports = {
  slash: true,
  cooldown: 30,
  data: new SlashCommandBuilder()    
    .setName('tamamla')
    .setDescription('Tamamlama oyununu oynarsınız.')
    .setDMPermission(false),
    
async execute(client, interaction) { 

  await interaction.deferReply()
  const db = new JsonDatabase({databasePath: `./Database/Database.json`})
  
  const Oyun = new Flood({
    message: interaction,
    slash_command: true,
    difficulty: 14,
    timeoutTime: 60000,
    buttonStyle: 'SECONDARY',
    emojis: ['🟥', '🟦', '🟧', '🟪', '🟩'],
    winMessage: 'Kazandın. Oynanan tur sayısı: **{turns}**',
    loseMessage: 'Kaybettin. Oynanan tur sayısı: **{turns}**',
    playerOnlyMessage: '**Tamamlama** oyununu şuanda {player} oynuyor.',
    embed: {
      title: 'Tamamla',
      color: Renk.Blurple,
    },
  })
  Oyun.startGame()
  Oyun.on('gameOver', Sonuç => {
    if(Sonuç.result === 'win') db.add(`Tamamla_${Sonuç.player.id}`, 1)
  })
  
  }
}