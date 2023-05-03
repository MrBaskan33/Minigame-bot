const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require ("discord.js")
const { JsonDatabase } = require("wio.db")
const Emoji = require("../Bot/Emojiler.json")
const Renk = require("../Bot/Renkler.json")
const { sahipid } = require("../ayarlar.json")
const { RockPaperScissors } = require('discord-gamecord')

module.exports = {
  slash: true,
  cooldown: 15,
  data: new SlashCommandBuilder()    
    .setName('taşkağıtmakas')
    .setDescription('Taş kağıt makas oyununu oynarsınız.')
    .setDMPermission(false)
    .addUserOption(option =>
      option
        .setName('kullanıcı')
        .setDescription('Taş kağıt makas oynayacağınız kullanıcı.')
        .setRequired(true)),
    
async execute(client, interaction) { 

  await interaction.deferReply()
  const db = new JsonDatabase({databasePath: `./Database/Database.json`})
  
  const Kullanıcı = interaction.options.getUser('kullanıcı')
  
  if(Kullanıcı === interaction.user.id) return await interaction.followUp({content: `Kendin ile oynayamazsın.`})
  if(Kullanıcı.bot) return await interaction.followUp({content: `Botlar ile oynayamazsın.`})
  
  const Oyun = new RockPaperScissors({
    message: interaction,
    opponent: Kullanıcı,
    slash_command: true,
    mentionUser: true,
    timeoutTime: 60000,
    buttonStyle: 'PRIMARY',
    requestMessage: '{player} adlı kullanıcı, {opponent} adlı kullanıcıya **Taş kağıt makas** oyunu daveti gönderdi.',
    timeoutMessage: '**Taş kağıt makas** oyununu zaman aşımına uğradı.',
    rejectMessage: '**Taş kağıt makas** oyununun daveti reddedildi.',
    pickMessage: '{emoji} seçeneğini seçtin.',
    winMessage: '{player} adlı kullanıcı oyunu kazandı.',
    tieMessage: '**Taş kağıt makas** oyunu berabere bitti.',
    playerOnlyMessage: '**Taş kağıt makas** oyununu şuanda {player} ve {opponent} arasında oynanıyor.',
    embed: {
      title: 'Taş kağıt makas',
      color: Renk.Blurple,
      description: 'Butonlar ile seçiminizi yapınız.'
    },
    buttons: {
      rock: 'Taş',
      paper: 'Kağıt',
      scissors: 'Makas'
    },
    emojis: {
      rock: '🌑',
      paper: '📰',
      scissors: '✂️'
    }
  })
  Oyun.startGame()
  Oyun.on('gameOver', Sonuç => {
    db.add(`TaşKağıtMakas_${Sonuç.winner}`, 1)
  })
  
  }
}