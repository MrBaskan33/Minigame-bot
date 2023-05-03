const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require ("discord.js")
const { JsonDatabase } = require("wio.db")
const Emoji = require("../Bot/Emojiler.json")
const Renk = require("../Bot/Renkler.json")
const { sahipid } = require("../ayarlar.json")
const { Hangman } = require('discord-gamecord')

module.exports = {
  slash: true,
  cooldown: 30,
  data: new SlashCommandBuilder()    
    .setName('adamasmaca')
    .setDescription('Adam asmaca oyununu oynarsınız.')
    .setDMPermission(false),
    
async execute(client, interaction) { 

  await interaction.deferReply()
  const db = new JsonDatabase({databasePath: `./Database/Database.json`})
  
  const Kelimeler = [
    "haren", "dunya", "elma", "araba", "telefon", "dıscord", "bılgısayar",
    "ev", "baskan", "mr", "oyun", "bot", "adam", "asma",
    "armut", "sunucu", "kral", "uptime", "odun", "bomba", "yıldırım",
    "holly", "masa"
  ]
  const Kelime = Math.round((Math.random() * Kelimeler.length))

  const Oyun = new Hangman({
    message: interaction,
    slash_command: true,
    timeoutTime: 60000,
    hangman: { hat: '🎩', head: '😑', shirt: '👕', pants: '👖', boots: '👟👟' },
    customWord: Kelimeler[Kelime],
    winMessage: 'Kazandın. Yazdığın kelime: **{word}**',
    loseMessage: 'Kaybettin. Doğru kelime: **{word}**',
    playerOnlyMessage: '**Adam asmaca** oyununu şuanda {player} oynuyor.',
    embed: {
      title: 'Adam asmaca',
      color: Renk.Blurple
    }
  })               
  Oyun.startGame()
  Oyun.on('gameOver', Sonuç => {
    if(Sonuç.result === 'win') db.add(`AdamAsmaca_${Sonuç.player.id}`, 1)
  })
  
  }
}