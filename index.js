const { Client, Collection } = require("discord.js");
const mongoose = require('mongoose')
const client = new Client({
    intents: 32767, // ALL
});
module.exports = client;

client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config");
mongoose.connect(client.config.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log(`Mongo Bağlantısı Kuruldu.`))

require("./handler")(client);

client.login(client.config.token);
