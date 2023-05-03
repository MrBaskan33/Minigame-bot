const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require ("discord.js")
const { JsonDatabase } = require("wio.db")
const Emoji = require("../Bot/Emojiler.json")
const Renk = require("../Bot/Renkler.json")
const { sahipid } = require("../ayarlar.json")
const { Minesweeper } = require('discord-gamecord')

module.exports = {
  slash: true,
  cooldown: 15,
  data: new SlashCommandBuilder()    
    .setName('mayıntarlası')
    .setDescription('Mayın tarlası oyununu oynarsınız.')
    .setDMPermission(false)
    .addStringOption(option =>
      option
        .setName('zorluk')
        .setDescription('Oyun zorluğunu seçiniz.')
        .setRequired(true)
        .addChoices(
          { name: "Kolay", value: "Kolay" },
          { name: "Orta", value: "Orta" },
          { name: "Zor", value: "Zor" })),
    
async execute(client, interaction) { 

  await interaction.deferReply()
  const db = new JsonDatabase({databasePath: `./Database/Database.json`})
  
  const Zorluk = interaction.options.getString('zorluk')
  let Derece 
  if(Zorluk === "Kolay") {
    Derece = 3
  } else if(Zorluk === "Orta") {
    Derece = 5
  } else if(Zorluk === "Zor") {
    Derece = 7
  }
  
  const Oyun = new Minesweeper({
    message: interaction,
    slash_command: true,
    timeoutTime: 60000,
    emojis: { flag: '🚩', mine: '💣' },
    mines: Derece,
    winMessage: 'Tebrikler kazandın.',
    loseMessage: 'Maalesef kaybettin.',
    playerOnlyMessage: '**Mayın tarlası** oyununu şuanda {player} oynuyor.',
    embed: {
      title: 'Mayın tarlası',
      color: Renk.Blurple,
      description: 'Butonlar ile tarlayı temizleyebilirsiniz.'
    }
  })
  Oyun.startGame()
  Oyun.on('gameOver', Sonuç => {
    if(Sonuç.result === 'win') db.add(`MayınTarlası_${Sonuç.player.id}.${Zorluk}`, 1)
  })
  
  }
}