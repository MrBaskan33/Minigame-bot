const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require ("discord.js")
const { JsonDatabase } = require("wio.db")
const Emoji = require("../Bot/Emojiler.json")
const Renk = require("../Bot/Renkler.json")
const Bekle = require('node:timers/promises').setTimeout

module.exports = {
  slash: true,
  cooldown: 15,
  data: new SlashCommandBuilder()    
    .setName('sıralama')
    .setDescription('Oyun puanları ve kazanma sayılarına göre sıralama yapar.')
    .setDMPermission(false)
    .addStringOption(option =>
      option
        .setName('oyun')
        .setDescription('Sıralamasını görmek istediğiniz oyun.')
        .setRequired(true)
        .addChoices(
          { name: "2048", value: "2048" },
          { name: "Emoji bulma", value: "Emoji bulma" },
          { name: "Tamamlama", value: "Tamamlama" },
          { name: "Adam asmaca", value: "Adam asmaca" },
          { name: "Mayın tarlası", value: "Mayın tarlası" },
          { name: "TicTacToe", value: "TicTacToe" },
          { name: "Eşleştirme", value: "Eşleştirme" },
          { name: "Slot", value: "Slot" },
          { name: "Taş kağıt makas", value: "Taş kağıt makas" },
          { name: "Connect4", value: "Connect4" },
          { name: "Yılan", value: "Yılan" },
          { name: "Yazı tura", value: "Yazı tura" },
          { name: "Birinciler", value: "Birinciler" })),
          
async execute(client, interaction) { 

  await interaction.deferReply()
  const db = new JsonDatabase({databasePath: `./Database/Database.json`})
  
  const Oyun = interaction.options.getString('oyun')
  
  switch(Oyun) {
    case "2048": {
      let Sayı = 1
      let Sonuç = client.users.cache.filter(x => (db.fetch(`2048_${x.id}`)) || 0)
        .sort((x,y) => (db.fetch(`2048_${y.id}`) || 0) - (db.fetch(`2048_${x.id}`)) || 0)
        .map((x) => {
          return `**${Sayı++}.** ${x.username} - ${db.fetch(`2048_${x.id}`) || 0} Puan`
        })
  
      const Embed = new EmbedBuilder()
        .setColor(Renk.Blurple)
        .setAuthor({name: `${client.user.username} | Oyun sıralaması`, iconURL: client.user.avatarURL()}) 
        .setDescription(`> 2048 oyunu kazanılan toplam skor sıralaması.`)
        .addFields(
          {
            name: `En fazla puana sahip 10 kullanıcı`,
            value: `${Sonuç.slice(0, 10).join("\n") || `Sıralamada kullanıcı bulunmuyor.`}`
          })
        .setFooter({text: interaction.user.username, iconURL: interaction.user.avatarURL()})
        .setTimestamp()
      await interaction.followUp({embeds: [Embed]})
    }
    break
    case "TicTacToe": {
      let Sayı = 1
      let Sonuç = client.users.cache.filter(x => (db.fetch(`TicTacToe_${x.id}`)) || 0)
        .sort((x,y) => (db.fetch(`TicTacToe_${y.id}`) || 0) - (db.fetch(`TicTacToe_${x.id}`)) || 0)
        .map((x) => {
          return `**${Sayı++}.** ${x.username} - ${db.fetch(`TicTacToe_${x.id}`) || 0} Kazanma`
        })
  
      const Embed = new EmbedBuilder()
        .setColor(Renk.Blurple)
        .setAuthor({name: `${client.user.username} | Oyun sıralaması`, iconURL: client.user.avatarURL()}) 
        .setDescription(`> TicTacToe oyunu kazanılan toplam oyun sayısı sıralaması.`)
        .addFields(
          {
            name: `En fazla kazanmaya sahip 10 kullanıcı`,
            value: `${Sonuç.slice(0, 10).join("\n") || `Sıralamada kullanıcı bulunmuyor.`}`
          })
        .setFooter({text: interaction.user.username, iconURL: interaction.user.avatarURL()})
        .setTimestamp()
      await interaction.followUp({embeds: [Embed]})
    }
    break
    case "Emoji bulma": {
      let Sayı = 1
      let Sonuç = client.users.cache.filter(x => (db.fetch(`EmojiBul_${x.id}`)) || 0)
        .sort((x,y) => (db.fetch(`EmojiBul_${y.id}`) || 0) - (db.fetch(`EmojiBul_${x.id}`)) || 0)
        .map((x) => {
          return `**${Sayı++}.** ${x.username} - ${db.fetch(`EmojiBul_${x.id}`) || 0} Kazanma`
        })
  
      const Embed = new EmbedBuilder()
        .setColor(Renk.Blurple)
        .setAuthor({name: `${client.user.username} | Oyun sıralaması`, iconURL: client.user.avatarURL()}) 
        .setDescription(`> Emoji bulma oyunu kazanılan toplam oyun sayısı sıralaması.`)
        .addFields(
          {
            name: `En fazla kazanmaya sahip 10 kullanıcı`,
            value: `${Sonuç.slice(0, 10).join("\n") || `Sıralamada kullanıcı bulunmuyor.`}`
          })
        .setFooter({text: interaction.user.username, iconURL: interaction.user.avatarURL()})
        .setTimestamp()
      await interaction.followUp({embeds: [Embed]})
    }
    break
    case "Tamamlama": {
      let Sayı = 1
      let Sonuç = client.users.cache.filter(x => (db.fetch(`Tamamla_${x.id}`)) || 0)
        .sort((x,y) => (db.fetch(`Tamamla_${y.id}`) || 0) - (db.fetch(`Tamamla_${x.id}`)) || 0)
        .map((x) => {
          return `**${Sayı++}.** ${x.username} - ${db.fetch(`Tamamla_${x.id}`) || 0} Bitirme`
        })
  
      const Embed = new EmbedBuilder()
        .setColor(Renk.Blurple)
        .setAuthor({name: `${client.user.username} | Oyun sıralaması`, iconURL: client.user.avatarURL()}) 
        .setDescription(`> Tamamlama oyunu tamamlanan toplam oyun sayısı sıralaması.`)
        .addFields(
          {
            name: `En fazla tamamlamaya sahip 10 kullanıcı`,
            value: `${Sonuç.slice(0, 10).join("\n") || `Sıralamada kullanıcı bulunmuyor.`}`
          })
        .setFooter({text: interaction.user.username, iconURL: interaction.user.avatarURL()})
        .setTimestamp()
      await interaction.followUp({embeds: [Embed]})
    }
    break
    case "Adam asmaca": {
      let Sayı = 1
      let Sonuç = client.users.cache.filter(x => (db.fetch(`AdamAsmaca_${x.id}`)) || 0)
        .sort((x,y) => (db.fetch(`AdamAsmaca_${y.id}`) || 0) - (db.fetch(`AdamAsmaca_${x.id}`)) || 0)
        .map((x) => {
          return `**${Sayı++}.** ${x.username} - ${db.fetch(`AdamAsmaca_${x.id}`) || 0} Kazanma`
        })
  
      const Embed = new EmbedBuilder()
        .setColor(Renk.Blurple)
        .setAuthor({name: `${client.user.username} | Oyun sıralaması`, iconURL: client.user.avatarURL()}) 
        .setDescription(`> Adam asmaca oyunu kazanılan toplam oyun sayısı sıralaması.`)
        .addFields(
          {
            name: `En fazla kazanmaya sahip 10 kullanıcı`,
            value: `${Sonuç.slice(0, 10).join("\n") || `Sıralamada kullanıcı bulunmuyor.`}`
          })
        .setFooter({text: interaction.user.username, iconURL: interaction.user.avatarURL()})
        .setTimestamp()
      await interaction.followUp({embeds: [Embed]})
    }
    break
    case "Mayın tarlası": {
      let Sayı = 1
      let Sonuç1 = client.users.cache.filter(x => (db.fetch(`MayınTarlası_${x.id}.Kolay`)) || 0)
        .sort((x,y) => (db.fetch(`MayınTarlası_${y.id}.Kolay`) || 0) - (db.fetch(`MayınTarlası_${x.id}.Kolay`)) || 0)
        .map((x) => {
          return `**${Sayı++}.** ${x.username} - ${db.fetch(`MayınTarlası_${x.id}.Kolay`) || 0} Kazanma`
        })
      let Sonuç2 = client.users.cache.filter(x => (db.fetch(`MayınTarlası_${x.id}.Orta`)) || 0)
        .sort((x,y) => (db.fetch(`MayınTarlası_${y.id}.Orta`) || 0) - (db.fetch(`MayınTarlası_${x.id}.Orta`)) || 0)
        .map((x) => {
          return `**${Sayı++}.** ${x.username} - ${db.fetch(`MayınTarlası_${x.id}.Orta`) || 0} Kazanma`
        })
      let Sonuç3 = client.users.cache.filter(x => (db.fetch(`MayınTarlası_${x.id}.Zor`)) || 0)
        .sort((x,y) => (db.fetch(`MayınTarlası_${y.id}.Zor`) || 0) - (db.fetch(`MayınTarlası_${x.id}.Zor`)) || 0)
        .map((x) => {
          return `**${Sayı++}.** ${x.username} - ${db.fetch(`MayınTarlası_${x.id}.Zor`) || 0} Kazanma`
        })
  
      const Embed = new EmbedBuilder()
        .setColor(Renk.Blurple)
        .setAuthor({name: `${client.user.username} | Oyun sıralaması`, iconURL: client.user.avatarURL()}) 
        .setDescription(`> Mayın tarlası oyunu kazanılan toplam oyun sayısı sıralaması.`)
        .addFields(
          {
            name: `Kolay modda en fazla kazanmaya sahip 10 kullanıcı`,
            value: `${Sonuç1.slice(0, 10).join("\n") || `Sıralamada kullanıcı bulunmuyor.`}`
          },
          {
            name: `Orta modda en fazla kazanmaya sahip 10 kullanıcı`,
            value: `${Sonuç2.slice(0, 10).join("\n") || `Sıralamada kullanıcı bulunmuyor.`}`
          },
          {
            name: `Zor modda en fazla kazanmaya sahip 10 kullanıcı`,
            value: `${Sonuç3.slice(0, 10).join("\n") || `Sıralamada kullanıcı bulunmuyor.`}`
          })
        .setFooter({text: interaction.user.username, iconURL: interaction.user.avatarURL()})
        .setTimestamp()
      await interaction.followUp({embeds: [Embed]})
    }
    break
    case "Eşleştirme": {
      let Sayı = 1
      let Sonuç = client.users.cache.filter(x => (db.fetch(`Eşleştirme_${x.id}`)) || 0)
        .sort((x,y) => (db.fetch(`Eşleştirme_${y.id}`) || 0) - (db.fetch(`Eşleştirme_${x.id}`)) || 0)
        .map((x) => {
          return `**${Sayı++}.** ${x.username} - ${db.fetch(`Eşleştirme_${x.id}`) || 0} Bitirme`
        })
  
      const Embed = new EmbedBuilder()
        .setColor(Renk.Blurple)
        .setAuthor({name: `${client.user.username} | Oyun sıralaması`, iconURL: client.user.avatarURL()}) 
        .setDescription(`> Eşleştirme oyunu bitirilen toplam oyun sayısı sıralaması.`)
        .addFields(
          {
            name: `En fazla bitirmeye sahip 10 kullanıcı`,
            value: `${Sonuç.slice(0, 10).join("\n") || `Sıralamada kullanıcı bulunmuyor.`}`
          })
        .setFooter({text: interaction.user.username, iconURL: interaction.user.avatarURL()})
        .setTimestamp()
      await interaction.followUp({embeds: [Embed]})
    }
    break
    case "Slot": {
      let Sayı = 1
      let Sonuç = client.users.cache.filter(x => (db.fetch(`Slot_${x.id}`)) || 0)
        .sort((x,y) => (db.fetch(`Slot_${y.id}`) || 0) - (db.fetch(`Slot_${x.id}`)) || 0)
        .map((x) => {
          return `**${Sayı++}.** ${x.username} - ${db.fetch(`Slot_${x.id}`) || 0} Kazanma`
        })
  
      const Embed = new EmbedBuilder()
        .setColor(Renk.Blurple)
        .setAuthor({name: `${client.user.username} | Oyun sıralaması`, iconURL: client.user.avatarURL()}) 
        .setDescription(`> Slot oyunu kazanılan toplam oyun sayısı sıralaması.`)
        .addFields(
          {
            name: `En fazla kazanmaya sahip 10 kullanıcı`,
            value: `${Sonuç.slice(0, 10).join("\n") || `Sıralamada kullanıcı bulunmuyor.`}`
          })
        .setFooter({text: interaction.user.username, iconURL: interaction.user.avatarURL()})
        .setTimestamp()
      await interaction.followUp({embeds: [Embed]})
    }
    break
    case "Taş kağıt makas": {
      let Sayı = 1
      let Sonuç = client.users.cache.filter(x => (db.fetch(`TaşKağıtMakas_${x.id}`)) || 0)
        .sort((x,y) => (db.fetch(`TaşKağıtMakas_${y.id}`) || 0) - (db.fetch(`TaşKağıtMakas_${x.id}`)) || 0)
        .map((x) => {
          return `**${Sayı++}.** ${x.username} - ${db.fetch(`TaşKağıtMakas_${x.id}`) || 0} Kazanma`
        })
  
      const Embed = new EmbedBuilder()
        .setColor(Renk.Blurple)
        .setAuthor({name: `${client.user.username} | Oyun sıralaması`, iconURL: client.user.avatarURL()}) 
        .setDescription(`> Taş kağıt makas oyunu kazanılan toplam oyun sayısı sıralaması.`)
        .addFields(
          {
            name: `En fazla kazanmaya sahip 10 kullanıcı`,
            value: `${Sonuç.slice(0, 10).join("\n") || `Sıralamada kullanıcı bulunmuyor.`}`
          })
        .setFooter({text: interaction.user.username, iconURL: interaction.user.avatarURL()})
        .setTimestamp()
      await interaction.followUp({embeds: [Embed]})
    }
    break
    case "Connect4": {
      let Sayı = 1
      let Sonuç = client.users.cache.filter(x => (db.fetch(`Connect4_${x.id}`)) || 0)
        .sort((x,y) => (db.fetch(`Connect4_${y.id}`) || 0) - (db.fetch(`Connect4_${x.id}`)) || 0)
        .map((x) => {
          return `**${Sayı++}.** ${x.username} - ${db.fetch(`Connect4_${x.id}`) || 0} Kazanma`
        })
  
      const Embed = new EmbedBuilder()
        .setColor(Renk.Blurple)
        .setAuthor({name: `${client.user.username} | Oyun sıralaması`, iconURL: client.user.avatarURL()}) 
        .setDescription(`> Connect4 oyunu kazanılan toplam oyun sayısı sıralaması.`)
        .addFields(
          {
            name: `En fazla kazanmaya sahip 10 kullanıcı`,
            value: `${Sonuç.slice(0, 10).join("\n") || `Sıralamada kullanıcı bulunmuyor.`}`
          })
        .setFooter({text: interaction.user.username, iconURL: interaction.user.avatarURL()})
        .setTimestamp()
      await interaction.followUp({embeds: [Embed]})
    }
    break
    case "Yılan": {
      let Sayı = 1
      let Sonuç = client.users.cache.filter(x => (db.fetch(`Yılan_${x.id}`)) || 0)
        .sort((x,y) => (db.fetch(`Yılan_${y.id}`) || 0) - (db.fetch(`Yılan_${x.id}`)) || 0)
        .map((x) => {
          return `**${Sayı++}.** ${x.username} - ${db.fetch(`Yılan_${x.id}`) || 0} Puan`
        })
  
      const Embed = new EmbedBuilder()
        .setColor(Renk.Blurple)
        .setAuthor({name: `${client.user.username} | Oyun sıralaması`, iconURL: client.user.avatarURL()}) 
        .setDescription(`> Yılan oyunu kazanılan toplam skor sıralaması.`)
        .addFields(
          {
            name: `En fazla puana sahip 10 kullanıcı`,
            value: `${Sonuç.slice(0, 10).join("\n") || `Sıralamada kullanıcı bulunmuyor.`}`
          })
        .setFooter({text: interaction.user.username, iconURL: interaction.user.avatarURL()})
        .setTimestamp()
      await interaction.followUp({embeds: [Embed]})
    }
    break
    case "Yazı tura": {
      let Sayı = 1
      let Sonuç = client.users.cache.filter(x => (db.fetch(`YazıTura_${x.id}`)) || 0)
        .sort((x,y) => (db.fetch(`YazıTura_${y.id}`) || 0) - (db.fetch(`YazıTura_${x.id}`)) || 0)
        .map((x) => {
          return `**${Sayı++}.** ${x.username} - ${db.fetch(`YazıTura_${x.id}`) || 0} Kazanma`
        })
  
      const Embed = new EmbedBuilder()
        .setColor(Renk.Blurple)
        .setAuthor({name: `${client.user.username} | Oyun sıralaması`, iconURL: client.user.avatarURL()}) 
        .setDescription(`> Yazı tura atarak kazanılan toplam skor sayısı sıralaması.`)
        .addFields(
          {
            name: `En fazla skora sahip 10 kullanıcı`,
            value: `${Sonuç.slice(0, 10).join("\n") || `Sıralamada kullanıcı bulunmuyor.`}`
          })
        .setFooter({text: interaction.user.username, iconURL: interaction.user.avatarURL()})
        .setTimestamp()
      await interaction.followUp({embeds: [Embed]})
    }
    break
    case "Birinciler": {
      const Geliyor = new EmbedBuilder()
        .setColor(Renk.Blurple)
        .setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
        .setTitle("Yükleniyor")
        .setDescription(`Sıralama verileri alınıyor lütfen bekleyiniz.`)
        .setTimestamp()
      const Yükleme = await interaction.followUp({embeds: [Geliyor], fetchReply: true})
      let Sonuç1 = client.users.cache.filter(x => (db.fetch(`2048_${x.id}`)) || 0)
        .sort((x,y) => (db.fetch(`2048_${y.id}`) || 0) - (db.fetch(`2048_${x.id}`)) || 0)
        .map((x) => {
          return `**${x.username}** - ${db.fetch(`2048_${x.id}`) || 0} Puan`
        })
      let Sonuç2 = client.users.cache.filter(x => (db.fetch(`EmojiBul_${x.id}`)) || 0)
        .sort((x,y) => (db.fetch(`EmojiBul_${y.id}`) || 0) - (db.fetch(`EmojiBul_${x.id}`)) || 0)
        .map((x) => {
          return `**${x.username}** - ${db.fetch(`EmojiBul_${x.id}`) || 0} Kazanma`
        })
      let Sonuç3 = client.users.cache.filter(x => (db.fetch(`Tamamla_${x.id}`)) || 0)
        .sort((x,y) => (db.fetch(`Tamamla_${y.id}`) || 0) - (db.fetch(`Tamamla_${x.id}`)) || 0)
        .map((x) => {
          return `**${x.username}** - ${db.fetch(`Tamamla_${x.id}`) || 0} Bitirme`
        })
      let Sonuç4 = client.users.cache.filter(x => (db.fetch(`AdamAsmaca_${x.id}`)) || 0)
        .sort((x,y) => (db.fetch(`AdamAsmaca_${y.id}`) || 0) - (db.fetch(`AdamAsmaca_${x.id}`)) || 0)
        .map((x) => {
          return `**${x.username}** - ${db.fetch(`AdamAsmaca_${x.id}`) || 0} Kazanma`
        })
      let Sonuç5 = client.users.cache.filter(x => (db.fetch(`Eşleştirme_${x.id}`)) || 0)
        .sort((x,y) => (db.fetch(`Eşleştirme_${y.id}`) || 0) - (db.fetch(`Eşleştirme_${x.id}`)) || 0)
        .map((x) => {
          return `**${x.username}** - ${db.fetch(`Eşleştirme_${x.id}`) || 0} Bitirme`
        })
      let Sonuç6 = client.users.cache.filter(x => (db.fetch(`Slot_${x.id}`)) || 0)
        .sort((x,y) => (db.fetch(`Slot_${y.id}`) || 0) - (db.fetch(`Slot_${x.id}`)) || 0)
        .map((x) => {
          return `**${x.username}** - ${db.fetch(`Slot_${x.id}`) || 0} Kazanma`
        })
      let Sonuç7 = client.users.cache.filter(x => (db.fetch(`TaşKağıtMakas_${x.id}`)) || 0)
        .sort((x,y) => (db.fetch(`TaşKağıtMakas_${y.id}`) || 0) - (db.fetch(`TaşKağıtMakas_${x.id}`)) || 0)
        .map((x) => {
          return `**${x.username}** - ${db.fetch(`TaşKağıtMakas_${x.id}`) || 0} Kazanma`
        })
      let Sonuç8 = client.users.cache.filter(x => (db.fetch(`Connect4_${x.id}`)) || 0)
        .sort((x,y) => (db.fetch(`Connect4_${y.id}`) || 0) - (db.fetch(`Connect4_${x.id}`)) || 0)
        .map((x) => {
          return `**${x.username}** - ${db.fetch(`Connect4_${x.id}`) || 0} Kazanma`
        })
      let Sonuç9 = client.users.cache.filter(x => (db.fetch(`Yılan_${x.id}`)) || 0)
        .sort((x,y) => (db.fetch(`Yılan_${y.id}`) || 0) - (db.fetch(`Yılan_${x.id}`)) || 0)
        .map((x) => {
          return `**${x.username}** - ${db.fetch(`Yılan_${x.id}`) || 0} Puan`
        })
      let Sonuç10 = client.users.cache.filter(x => (db.fetch(`YazıTura_${x.id}`)) || 0)
        .sort((x,y) => (db.fetch(`YazıTura_${y.id}`) || 0) - (db.fetch(`YazıTura_${x.id}`)) || 0)
        .map((x) => {
          return `**${x.username}** - ${db.fetch(`YazıTura_${x.id}`) || 0} Kazanma`
        })
      let Sonuç11 = client.users.cache.filter(x => (db.fetch(`TicTacToe_${x.id}`)) || 0)
        .sort((x,y) => (db.fetch(`TicTacToe_${y.id}`) || 0) - (db.fetch(`TicTacToe_${x.id}`)) || 0)
        .map((x) => {
          return `**${x.username}** - ${db.fetch(`TicTacToe_${x.id}`) || 0} Kazanma`
        })
      let Sonuç12 = client.users.cache.filter(x => (db.fetch(`MayınTarlası_${x.id}.Kolay`)) || 0)
        .sort((x,y) => (db.fetch(`MayınTarlası_${y.id}.Kolay`) || 0) - (db.fetch(`MayınTarlası_${x.id}.Kolay`)) || 0)
        .map((x) => {
          return `**${x.username}** - ${db.fetch(`MayınTarlası_${x.id}.Kolay`) || 0} Kazanma`
        })
      let Sonuç13 = client.users.cache.filter(x => (db.fetch(`MayınTarlası_${x.id}.Orta`)) || 0)
        .sort((x,y) => (db.fetch(`MayınTarlası_${y.id}.Orta`) || 0) - (db.fetch(`MayınTarlası_${x.id}.Orta`)) || 0)
        .map((x) => {
          return `**${x.username}** - ${db.fetch(`MayınTarlası_${x.id}.Orta`) || 0} Kazanma`
        })
      let Sonuç14 = client.users.cache.filter(x => (db.fetch(`MayınTarlası_${x.id}.Zor`)) || 0)
        .sort((x,y) => (db.fetch(`MayınTarlası_${y.id}.Zor`) || 0) - (db.fetch(`MayınTarlası_${x.id}.Zor`)) || 0)
        .map((x) => {
          return `**${x.username}** - ${db.fetch(`MayınTarlası_${x.id}.Zor`) || 0} Kazanma`
        })
      await Bekle(Yükleme.createdTimestamp - interaction.createdTimestamp + 1000)
      const Embed = new EmbedBuilder()
        .setColor(Renk.Blurple)
        .setAuthor({name: `${client.user.username} | Oyun sıralaması`, iconURL: client.user.avatarURL()}) 
        .setDescription(`> Tüm oyunlardaki birinci olan kullanıcılar.`)
        .addFields(
          {
            name: `2048 oyunu en fazla puana sahip kullanıcı`,
            value: `> ${Sonuç1.slice(0, 1) || `Sıralamada kullanıcı bulunmuyor.`}`,
            inline: true
          },
          {
            name: `Emoji bulma oyunu en fazla kazanmaya sahip kullanıcı`,
            value: `> ${Sonuç2.slice(0, 1) || `Sıralamada kullanıcı bulunmuyor.`}`,
            inline: true
          },
          {
            name: `Tamamlama oyunu en fazla tamamlamaya sahip kullanıcı`,
            value: `> ${Sonuç3.slice(0, 1) || `Sıralamada kullanıcı bulunmuyor.`}`,
            inline: true
          },
          {
            name: `Adam asmaca oyunu en fazla kazanmaya sahip kullanıcı`,
            value: `> ${Sonuç4.slice(0, 1) || `Sıralamada kullanıcı bulunmuyor.`}`,
            inline: true
          },
          {
            name: `Eşleştirme oyunu en fazla bitirmeye sahip kullanıcı`,
            value: `> ${Sonuç5.slice(0, 1) || `Sıralamada kullanıcı bulunmuyor.`}`,
            inline: true
          },
          {
            name: `Slot oyunu en fazla kazanmaya sahip kullanıcı`,
            value: `> ${Sonuç6.slice(0, 1) || `Sıralamada kullanıcı bulunmuyor.`}`,
            inline: true
          },
          {
            name: `Taş kağıt makas oyunu en fazla kazanmaya sahip kullanıcı`,
            value: `> ${Sonuç7.slice(0, 1) || `Sıralamada kullanıcı bulunmuyor.`}`,
            inline: true
          },
          {
            name: `Connect4 oyunu en fazla kazanmaya sahip kullanıcı`,
            value: `> ${Sonuç8.slice(0, 1) || `Sıralamada kullanıcı bulunmuyor.`}`,
            inline: true
          },
          {
            name: `Yılan oyunu en fazla puana sahip kullanıcı`,
            value: `> ${Sonuç9.slice(0, 1) || `Sıralamada kullanıcı bulunmuyor.`}`,
            inline: true
          },
          {
            name: `Yazı tura oyunu en fazla kazanmaya sahip kullanıcı`,
            value: `> ${Sonuç10.slice(0, 1) || `Sıralamada kullanıcı bulunmuyor.`}`,
            inline: true
          },
          {
            name: `TicTacToe oyunu en fazla kazanmaya sahip kullanıcı`,
            value: `> ${Sonuç11.slice(0, 1) || `Sıralamada kullanıcı bulunmuyor.`}`,
            inline: true
          },
          {
            name: `Mayın tarlası oyunu kolay modda en fazla kazanmaya sahip kullanıcı`,
            value: `> ${Sonuç12.slice(0, 1) || `Sıralamada kullanıcı bulunmuyor.`}`
          },
          {
            name: `Mayın tarlası oyunu orta modda en fazla kazanmaya sahip kullanıcı`,
            value: `> ${Sonuç13.slice(0, 1) || `Sıralamada kullanıcı bulunmuyor.`}`
          },
          {
            name: `Mayın tarlası oyunu zor modda en fazla kazanmaya sahip kullanıcı`,
            value: `> ${Sonuç14.slice(0, 1) || `Sıralamada kullanıcı bulunmuyor.`}`
          })
        .setFooter({text: interaction.user.username, iconURL: interaction.user.avatarURL()})
        .setTimestamp()
      await interaction.editReply({embeds: [Embed]})
    }
    break
  }
  
  }
}