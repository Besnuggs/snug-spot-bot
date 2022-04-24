const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Replies with the tag and id of the user executing the command.'),
  execute: async ({interaction, client}) => {
    await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`)
  }
}