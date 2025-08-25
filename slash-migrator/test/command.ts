import { SCOPE_GLOBAL, SlashCommandBuilder } from '@dsc-slash/builder/command'

export default new SlashCommandBuilder('some_name')
.setDescription('This is a test command')
.setScope('780155154720751649')
.onInteraction(async (options, interaction) => {

})