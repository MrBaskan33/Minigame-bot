const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require ("discord.js")
const { JsonDatabase } = require("wio.db")
const Emoji = require("../Bot/Emojiler.json")
const Renk = require("../Bot/Renkler.json")
const { sahipid } = require("../ayarlar.json")
const { Snake } = require('discord-gamecord')

module.exports = {
  slash: true,
  cooldown: 30,
  data: new SlashCommandBuilder()    
    .setName('yılan')
    .setDescription('Yılan oyununu oynarsınız.')
    .setDMPermission(false),
    
async execute(client, interaction) { 

  await interaction.deferReply()
  const db = new JsonDatabase({databasePath: `./Database/Database.json`})
  
  const Oyun = new Snake({
    message: interaction,
    slash_command: true,
    timeoutTime: 60000,
    stopButton: 'Bitir',
    snake: { head: '🟢', body: '🟩', tail: '🟢', over: '💀' },
    foods: ['🍎', '🍇', '🍊', '🫐', '🥕', '🥝', '🌽'],
    playerOnlyMessage: 'Only {player} can use these buttons.',
    embed: {
      title: 'Yılan oyunu',
      overTitle: 'Oyun bitti',
      color: Renk.Blurple
    },
    emojis: {
      board: '⬛',
      food: '🍎',
      up: '⬆️',
      down: '⬇️',
      left: '⬅️',
      right: '➡️',
    }
  })
  Oyun.startGame()
  Oyun.on('gameOver', Sonuç => {
    if(Sonuç.score > 0) db.add(`Yılan_${Sonuç.player.id}`, Sonuç.score)
  })
  
  }
}