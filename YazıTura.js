const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require ("discord.js")
const { JsonDatabase } = require("wio.db")
const Emoji = require("../Bot/Emojiler.json")
const Renk = require("../Bot/Renkler.json")
const { sahipid } = require("../ayarlar.json")

module.exports = {
  slash: true, 
  cooldown: 15,
  data: new SlashCommandBuilder()    
    .setName('yazıtura')
    .setDescription('Yazı tura atarsınız.')
    .setDMPermission(false)
    .addStringOption(option =>
      option
        .setName('seçenek')
        .setDescription('Yazı tura atacağın seçenek.')
        .setRequired(true)
        .addChoices(
          { name: "Yazı", value: "Yazı" },
          { name: "Tura", value: "Tura" })),

async execute(client, interaction) { 
  
  await interaction.deferReply()
  const db = new JsonDatabase({databasePath: `./Database/Database.json`})
  
  const Seçenek = interaction.options.getString('seçenek')
  
  var Seçenekler = ['Yazı', 'Tura']
  var Sonuç = Seçenekler[Math.floor(Math.random() * Seçenekler.length)]
  
  if(Sonuç === Seçenek) {
  
    db.add(`YazıTura_${interaction.user.id}`, 1)
    
    const Kazanıldı = new EmbedBuilder()
      .setColor(Renk.Blurple)
      .setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
      .setTitle("Yazı tura")
      .setDescription(`Kazandın. Seçtiğin seçenek: **${Sonuç}**`)
      .setTimestamp()
    await interaction.followUp({embeds: [Kazanıldı]})
  
  } else {
    
    const Kaybedildi = new EmbedBuilder()
      .setColor(Renk.Blurple)
      .setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
      .setTitle("Yazı tura")
      .setDescription(`Kaybettin. Gelen seçenek: **${Sonuç}**`)
      .setTimestamp()
    await interaction.followUp({embeds: [Kaybedildi]}) 
    
  }
  
  }
}