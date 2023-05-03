const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require ("discord.js")
const { JsonDatabase } = require("wio.db")
const Emoji = require("../Bot/Emojiler.json")
const Renk = require("../Bot/Renkler.json")
const { sahipid } = require("../ayarlar.json")
const { TicTacToe } = require('discord-gamecord')

module.exports = {
  slash: true,
  cooldown: 30,
  data: new SlashCommandBuilder()    
    .setName('tictactoe')
    .setDescription('TicTacToe oyununu oynarsınız.')
    .setDMPermission(false)
    .addUserOption(option =>
      option
        .setName('kullanıcı')
        .setDescription('TicTacToe oynayacağınız kullanıcı.')
        .setRequired(true)),
    
async execute(client, interaction) { 

  await interaction.deferReply()
  const db = new JsonDatabase({databasePath: `./Database/Database.json`})
  
  const Kullanıcı = interaction.options.getUser('kullanıcı')
  
  if(Kullanıcı === interaction.user.id) return await interaction.followUp({content: `Kendin ile oynayamazsın.`})
  if(Kullanıcı.bot) return await interaction.followUp({content: `Botlar ile oynayamazsın.`})
  
  const Oyun = new TicTacToe({
    message: interaction,
    opponent: Kullanıcı,
    slash_command: true,
    mentionUser: true,
    xColor: 'red',
    oColor: 'blurple',
    timeoutTime: 60000,
    xButtonStyle: 'DANGER',
    oButtonStyle: 'PRIMARY',
    acceptButton: 'Kabul',
    requestMessage: '{player} adlı kullanıcı, {opponent} adlı kullanıcıya **TicTacToe** oyunu daveti gönderdi.',
    timeoutMessage: '**TicTacToe** oyunu zaman aşımına uğradı.',
    rejectMessage: '**TicTacToe** oyununun daveti reddedildi.',
    turnMessage: '{emoji} | {player} adlı kullanıcının sırası.',
    tieMessage: '**TicTacToe** oyunu berabere bitti.',
    winMessage: '{emoji} | {player} adlı kullanıcı oyunu kazandı.',
    playerOnlyMessage: '**TicTacToe** oyunu şuanda {player} ve {opponent} arasında oynanıyor.',
    embed: {
      title: 'TicTacToe',
      statusTitle: 'Oyun bilgisi',
      overTitle: 'Oyun bitti',
      color: Renk.Blurple
    },
    emojis: {
      xButton: '❌',
      oButton: '🔵',
      blankButton: '➖'
    }
  })
  Oyun.startGame()
  Oyun.on('gameOver', Sonuç => {
    db.add(`TicTacToe_${Sonuç.winner}`, 1)
  })
  
  }
}