const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require ("discord.js")
const { JsonDatabase } = require("wio.db")
const Emoji = require("../Bot/Emojiler.json")
const Renk = require("../Bot/Renkler.json")
const { sahipid } = require("../ayarlar.json")
const { Slots } = require('discord-gamecord')

module.exports = {
  slash: true,
  cooldown: 15,
  data: new SlashCommandBuilder()    
    .setName('slot')
    .setDescription('Slot oyununu oynarsınız.')
    .setDMPermission(false),
    
async execute(client, interaction) { 

  await interaction.deferReply()
  const db = new JsonDatabase({databasePath: `./Database/Database.json`})
  
  const Oyun = new Slots({
    message: interaction,
    slash_command: true,
    slots: ['🍇', '🍊', '🍋', '🍌'],
    embed: {
      title: 'Slot makinesi',
      color: Renk.Blurple
    }
  })
  Oyun.startGame()
  Oyun.on('gameOver', Sonuç => {
    if(Sonuç.result === 'win') db.add(`Slot_${Sonuç.player.id}`, 1)
  })
  
  }
}