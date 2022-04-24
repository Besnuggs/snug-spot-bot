require('dotenv').config();
const { PORT, SNUG_SPOT_BOT_TOKEN } = process.env;
const fs = require('fs')
const { Client, Collection, Intents, Channel } = require('discord.js');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]
});
const {currentTokenHasExpired, setAccessToken} = require('./spotify/SpotifyUtils')
const { Player } = require('discord-player')

client.player = new Player(client, {
  ytdlOptions: {
      quality: "highestaudio",
      highWaterMark: 1 << 25
  }
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('error', (error) => {
  console.error(error)
});

client.on('channelDelete', (channel) => {
  console.log(`channelDelete: ${channel}`)
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  const commandOptions = {
    interaction,
    client
  }

  if (interaction.commandName.includes('spotify') && currentTokenHasExpired()) {
    await setAccessToken()
    console.log('Access Token Reset!')
  }

  try {
    await interaction.deferReply()
    await command.execute(commandOptions);
  } catch (e) {
    console.error(e)
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
})

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
	client.commands.set(command.data.name, command);
}


client.login(SNUG_SPOT_BOT_TOKEN);