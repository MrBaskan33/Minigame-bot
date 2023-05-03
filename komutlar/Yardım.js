const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require ("discord.js")
const { JsonDatabase } = require("wio.db")
const Emoji = require("../Bot/Emojiler.json")
const Renk = require("../Bot/Renkler.json")

module.exports = {
  slash: true,
  cooldown: 15,
  data: new SlashCommandBuilder()    
    .setName('yardım')
    .setDescription('Oyun botunun yardım menünüsü gösterir.')
    .setDMPermission(false),
    
async execute(client, interaction) { 

  await interaction.deferReply()
  const db = new JsonDatabase({databasePath: `./Database/Database.json`})
  
  const Embed = new EmbedBuilder()
    .setColor(Renk.Blurple)
    .setAuthor({name: `${client.user.username} | Yardım menüsü`, iconURL: client.user.avatarURL()}) 
    .setDescription(`
> **/yardım** - Yardım menüsünü gösterir.
> **/sıralama** - Oyunların skorları için sıralamaları gösterir.
> **/tictactoe** - TicTacToe oyununu oynarsınız.
> **/emojibul** - Emoji bulma oyununu oynarsınız.
> **/2048** - 2048 oyununu oynarsınız.
> **/tamamla** - Tamamlama oyununu oynarsınız.
> **/eşleştirme** - Eşleştirme oyununu oynarsınız.
> **/adamasmaca** - Adam asmaca oyununu oynarsınız.
> **/mayıntarlası** - Mayın tarlası oyununu oynarsınız.
> **/slot** - Slot oyununu oynarsınız.
> **/taşkağıtmakas** - Taş kağıt makas oyununu oynarsınız.
> **/yılan** - Yılan oyununu oynarsınız.
> **/connect4** - Connect4 oyununu oynarsınız.
> **/yazıtura** - Yazı tura atarsınız.
    `)
    .setFooter({text: interaction.user.username, iconURL: interaction.user.avatarURL()})
    .setTimestamp()
  await interaction.followUp({embeds: [Embed]})
    
  }
}
