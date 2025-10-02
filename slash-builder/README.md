# */slash command* builder
A plug-in for discord.js that lets you focus on writing code, and not worry about how you're going to register each and every one, as well as handle them!

## Requirements
- discord.js `>=14.12.0` (is peer dependency of @dsc-slash/builder)
- hand-tested on Node v23, can't confirm other versions (no unit tests yet)

## Getting started
Install the package in your desired directory

To write your commands, create the following files:
```ts
// ------ index.ts
import { Client } from "discord.js";
import { SlashCommandHandler } from "@dsc-slash/builder";

const client = new Client({ intents: /* Your Bot's Intents */})
const handler = new SlashCommandHandler()
handler.loadCommands('./place/with/commands/') // or your own path

client.on('interactionCreate', async (interaction) => {
    if(await handler.handleInteraction(interaction)) return
    else throw 'Failed to handle.'
})

client.login(/* Your Bot Token */)
```
```ts
// ------ ./place/with/commands/something.ts
import { SCOPE_GLOBAL, SlashCommandBuilder } from '@dsc-slash/builder/command'
import { string } from '@dsc-slash/builder/options/string' // All option types follow this convention
// Available option types: attachment, boolean, channel, mentionable, numeric, role, string, user
import {choice} from '@dsc-slash/builder/options/choices'

export default new SlashCommandBuilder('some_name')
.setDescription('This is a test command')
.setScope(SCOPE_GLOBAL) // or replace with the guild ID as string
.setOptions(() => [
    string('yourStringOption', 'This is an option').setRequired(false)
    string('anotherStringOption', 'Electric Boogaloo')
    .setRequired(false)
    .setChoices(() => [
        choice('option1', 'Value 1'),
        choice('option2', 'Value 2')
    ])
])
.onInteraction(async (options, interaction) => {
    // TODO Do something with the data. It will be typed!
    if(options.yourStringOption) {
        await interaction.reply(options.yourStringOption)
    }
})
```

All builder options are based on the Discord API documentation, so if you can

After you've written that, you run:
```
npx @dsc-slash/migrator
```

And that's it, the commands are registered!

> The migrator package can only add commands as of writing, not remove or edit them.
> As per the Discord Documentation, adding a command with an existing name will remove the old one.

To run the bot, just use your preferred TS compiler like `tsc` (you need to have typescript installed globally)
or with TypeScript Execute `npx tsx ./index.ts`