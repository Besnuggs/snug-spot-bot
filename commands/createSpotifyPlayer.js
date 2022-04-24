const { SlashCommandBuilder } = require('@discordjs/builders')
const { exec } = require('child_process');
const fs = require('fs')
const SpotifyService = require('../spotify/SpotifyService')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('create-spotify-player')
    .setDescription('Will create a spotify player. This is necessary in order to request songs.'),
  execute: async ({ interaction, client }) => {
    const spotifyService = new SpotifyService()
    const userProfile = await spotifyService.getUserProfile()
    console.log(userProfile)

    // const spotifyPlayerExists = Boolean(fs.readdirSync('./discord-server-spotify-players').filter((file) => file.includes(interaction.guildId))[0])
    // let response = 'Spotify player already exists! 😕'

    // if (!spotifyPlayerExists) {
    //   response = '🤖 Spotify player was created successfully. 🎵'

    //   exec(`sh ${process.env.PATH_TO_PROJECT_DIR}/build_spotify_player.sh ${interaction.guildId}`, (err,stdout,stderr) => {
    //     if (err) {
    //       console.error(err)
    //     } else {
    //       // the *entire* stdout and stderr (buffered)
    //       console.log(`stdout: ${stdout}`);
    //       console.log(`stderr: ${stderr}`);
    //     }
    //   })
    // }

    await interaction.reply('success')
  }
}