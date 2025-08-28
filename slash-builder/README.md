> [!IMPORTANT]
> This package is still in beta and has missing features. And may be broken.

# @dsc-slash/builder
The package that lets you focus on writing commands, not handling them.

## Getting started
To write your commands, you do something like this:
```ts
// ------ index.ts
import { Client } from "discord.js";
import { SlashCommandHandler } from "@dsc-slash/builder";

const client = new Client({ intents: [...yourIntents]})
const handler = new SlashCommandHandler()
handler.loadCommands('./place/with/commands/')

client.on('interactionCreate', async (interaction) => {
    if(await handler.handleInteraction(interaction)) return
    else throw 'Failed to handle.'
})

// ------ place/with/commands/something.ts
import { SCOPE_GLOBAL, SlashCommandBuilder } from '@dsc-slash/builder/command'
import { string } from '@dsc-slash/builder/options/string'

export default new SlashCommandBuilder('some_name')
.setDescription('This is a test command')
.setScope(SCOPE_GLOBAL)
.setOptions(() => [
    string('yourStringOption', 'This is an option').setRequired(false)
])
.onInteraction(async (options, interaction) => {
    if(options.yourStringOption) {
        await interaction.reply(options.yourStringOption)
    }
})
```

After you've written that, you run:
```
npx @dsc-slash/migrator
```

And that's it!*