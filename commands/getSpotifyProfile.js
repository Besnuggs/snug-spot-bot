const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports={
  data: new SlashCommandBuilder()
    .setName('get-spotify-profile')
    .setDescription('Will retrieve spotify profile.'),
  execute: async ({interaction, client}) => {
    
  }
}