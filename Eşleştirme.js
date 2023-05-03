const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require ("discord.js")
const { JsonDatabase } = require("wio.db")
const Emoji = require("../Bot/Emojiler.json")
const Renk = require("../Bot/Renkler.json")
const { sahipid } = require("../ayarlar.json")
const { MatchPairs } = require('discord-gamecord')

module.exports = {
  slash: true,
  cooldown: 30,
  data: new SlashCommandBuilder()    
    .setName('eşleştirme')
    .setDescription('Eşleştirme oyununu oynarsınız.')
    .setDMPermission(false),
    
async execute(client, interaction) { 

  await interaction.deferReply()
  const db = new JsonDatabase({databasePath: `./Database/Database.json`})
  
  const Oyun = new MatchPairs({
    message: interaction,
    slash_command: true,
    timeoutTime: 60000,
    emojis: ['🍉', '🍇', '🍊', '🥭', '🍎', '🍏', '🥝', '🥥', '🍓', '🫐', '🍍', '🥕', '🥔'],
    winMessage: 'Kazandın. Çevirdiğin taş sayısı: **{tilesTurned}**',
    loseMessage: 'Kaybettin..Çevirdiğin taş sayısı: **{tilesTurned}**',
    playerOnlyMessage: '**Eşleştirme** oyununu şuanda {player} oynuyor.',
    embed: {
      title: 'Eşleştirme',
      color: Renk.Blurple,
      description: 'Butonları açarak aynı emojileri eşleştirmeniz gerekli.'
    }
  })
  Oyun.startGame()
  Oyun.on('gameOver', Sonuç => {
    if(Sonuç.result === 'win') db.add(`Eşleştirme_${Sonuç.player.id}`, 1)
  })
  
  }
}