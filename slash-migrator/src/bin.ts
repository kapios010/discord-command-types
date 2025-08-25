import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import chalk from 'chalk'
import readlineSync from 'readline-sync'
import { SlashCommandHandler } from '@dsc-slash/builder'
import { SlashCommandExecutor } from '@dsc-slash/builder/command/data'
import { BaseOption, DiscordOptionTypes } from '@dsc-slash/builder/options/common'
import { Collection } from 'discord.js'
import { SCOPE_GLOBAL } from '@dsc-slash/builder/command'
import axios from 'axios'
import { AxiosRequestConfig } from 'axios'

//@ts-ignore - @types/node is installed
const argv = yargs(hideBin(process.argv)).parse()

console.log(
    chalk.bgRed('[IMPORTANT]') +
        chalk.red(
            ' This project is still in the works. See the progress at https://github.com/users/kapios010/projects/9/.'
        )
)
console.log(
    chalk.bgRed('[IMPORTANT]') +
        chalk.red(
            ' This command does not delete existing unused commands. Which certainly makes it less useful,\n' +
            'but it does replace commands with the same name as per the Discord API.\n' +
            'For now you can use https://slash-commands-gui.androz2091.fr/'
        )
)
console.log(chalk.cyan('|>|> DSC-SLASH MIGRATOR <|<|\n\n'))

const appId: string = readlineSync.question('Enter your Application ID: ')
const botToken: string = readlineSync.question('Enter your Bot Token: ')
const commandsDir: string = readlineSync.questionPath('Where are your commands located? ', {
    isDirectory: true,
    create: false,
    exists: true,
})

const handler = new SlashCommandHandler()
handler.loadCommands(commandsDir, false)

for (const command of handler.loadedCommands.values()) {
    console.log(`Uploading ${command.data.name}...`)
    let path: string
    if (command.data.scope == SCOPE_GLOBAL) {
        path = `commands`
    } else {
        path = `guilds/${command.data.scope}/commands`
    }
    path = `https://discord.com/api/v10/applications/${appId}/` + path
    const data = JSON.stringify(command.data)
    const options: AxiosRequestConfig = {
        headers: {
            'content-type': 'application/json',
            'content-length': Buffer.byteLength(data),
            authorization: `Bot ${botToken}`,
        },
    }
    axios.post(path, data, options)
    .then(res => {
        if(res.status == 201) {
            console.log(chalk.green(`Created command ${command.data.name} ${command.data.scope == SCOPE_GLOBAL ? 'globally' : 'in guild'}.`))
        }
        else if(res.status == 200) {
            console.log(chalk.green(`Replaced command ${command.data.name}.`))
        }
    })
    .catch((error) => {
        console.log(chalk.red(`Failed to create command ${command.data.name}: ${error}.`))
    })

}
