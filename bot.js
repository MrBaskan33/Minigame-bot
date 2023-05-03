const{ Client, Partials, Discord, MessageAutoDeleteTrigger } = require('discord.js')
const client = new Client({ intents: 131071, partials: Object.values(Partials).filter(x => typeof x === "string"), shards: 'auto' })
const { botid, token, mongo } = require("./ayarlar.json")
const fetch = require("node-fetch2")
require("./slash")(client)
client.login(token)
const mongoose = require("mongoose")
require("advanced-logs")
console.setConfig({
  background: false,
  timestamp: false
})
mongoose.connect(mongo)
  .then(() => console.success(` `, ` MongoDB bağlandı.`))
  .catch(err => console.error(` `, ` MongoDB hata verdi: ${err}`))