const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require ("discord.js")
const { JsonDatabase } = require("wio.db")
const Emoji = require("../Bot/Emojiler.json")
const Renk = require("../Bot/Renkler.json")
const { sahipid } = require("../ayarlar.json")
const { FindEmoji } = require('discord-gamecord')

module.exports = {
  slash: true,
  cooldown: 15,
  data: new SlashCommandBuilder()    
    .setName('emojibul')
    .setDescription('Emoji bulma oyununu oynarsınız.')
    .setDMPermission(false),
    
async execute(client, interaction) { 

  await interaction.deferReply()
  const db = new JsonDatabase({databasePath: `./Database/Database.json`})
  
  const Oyun = new FindEmoji({
    message: interaction,
    slash_command: true,
    timeoutTime: 60000,
    hideEmojiTime: 5000,
    buttonStyle: 'SECONDARY',
    emojis: ['🍉', '🍇', '🍊', '🍋', '🥭', '🍎', '🍏', '🥝'],
    winMessage: 'Doğru emojiyi seçtin ve kazandın. Seçtiğin emoji: {emoji}',
    loseMessage: 'Yanlış emojiyi seçtin ve kaybettin. Doğru emoji: {emoji}',
    timeoutMessage: 'Oyun zaman aşımına uğradı. Doğru emoji: {emoji}',
    playerOnlyMessage: '**Emoji bul** oyununu şuanda {player} oynuyor.',
    embed: {
      title: 'Emoji bulma',
      color: Renk.Blurple,
      description: 'Aşağıda bulunan butonlardaki emojileri aklınızda tutunuz.',
      findDescription: 'Süre dolmadan {emoji} emojisini bulunuz.'
    }
  })
  Oyun.startGame()
  Oyun.on('gameOver', Sonuç => {
    if(Sonuç.result === 'win') db.add(`EmojiBul_${Sonuç.player.id}`, 1)
  })
  
  }
}