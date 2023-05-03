const{ Client, Partials, Discord, MessageAutoDeleteTrigger } = require('discord.js')
const client = new Client({ intents: 131071, partials: Object.values(Partials).filter(x => typeof x === "string"), shards: 'auto' })
const { botid, token } = require("./ayarlar.json")
require("./slash")(client)
client.login(token)
require("advanced-logs")
console.setConfig({
  background: false,
  timestamp: false
})
