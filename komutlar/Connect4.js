const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require ("discord.js")
const { JsonDatabase } = require("wio.db")
const Emoji = require("../Bot/Emojiler.json")
const Renk = require("../Bot/Renkler.json")
const { sahipid } = require("../ayarlar.json")
const { Connect4 } = require('discord-gamecord')

module.exports = {
  slash: true,
  cooldown: 30,
  data: new SlashCommandBuilder()    
    .setName('connect4')
    .setDescription('Connect4 oyununu oynarsınız.')
    .setDMPermission(false)
    .addUserOption(option =>
      option
        .setName('kullanıcı')
        .setDescription('Connect4 oynayacağınız kullanıcı.')
        .setRequired(true)),
    
async execute(client, interaction) { 

  await interaction.deferReply()
  const db = new JsonDatabase({databasePath: `./Database/Database.json`})
  
  const Kullanıcı = interaction.options.getUser('kullanıcı')
  
  if(Kullanıcı === interaction.user.id) return await interaction.followUp({content: `Kendin ile oynayamazsın.`})
  if(Kullanıcı.bot) return await interaction.followUp({content: `Botlar ile oynayamazsın.`})
  
  const Oyun = new Connect4({
    message: interaction,
    opponent: Kullanıcı,
    slash_command: true,
    mentionUser: true,
    buttonStyle: 'PRIMARY',
    requestMessage: '{player} adlı kullanıcı, {opponent} adlı kullanıcıya **Connect4** oyunu daveti gönderdi.',
    rejectMessage: '**Connect4** oyununun daveti reddedildi.',
    turnMessage: '{emoji} | {player} adlı kullanıcının sırası.',
    winMessage: '{emoji} | {player} adlı kullanıcı oyunu kazandı.',
    tieMessage: '**Connect4** oyunu berabere bitti.',
    timeoutMessage: '**Connect4** oyunu zaman aşımına uğradı.',
    playerOnlyMessage: '**Connect4** oyunu şuanda {player} ve {opponent} arasında oynanıyor.',
    embed: {
      title: 'Connect4',
      statusTitle: 'Oyun bilgisi',
      color: Renk.Blurple
    },
    emojis: {
      board: '⚪',
      player1: '🔴',
      player2: '🟡'
    }
  })
  Oyun.startGame()
  Oyun.on('gameOver', Sonuç => {
    db.add(`Connect4_${Sonuç.winner}`, 1)
  })
  
  }
}