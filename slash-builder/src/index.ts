import { Client, Collection, Interaction } from 'discord.js'
import { SlashCommandExecutor, SlashCommandMigratorData } from './command/command_data'
import { BaseOption, DiscordOptionTypes } from './options/common'
import * as path from 'path'
import * as fs from 'fs'
import parentModule from 'parent-module'
import { TypeFromDiscordOptionType } from './command/parse_options'
import { DefaultBool, NOT, Nullable } from './utils'

class DiscordSlashHandler {
    public readonly applicationId: string
    public readonly botToken: string
    public readonly loadedCommands: Collection<
        string,
        SlashCommandExecutor<BaseOption<string, DiscordOptionTypes, boolean>[]>
    > = new Collection()

    constructor(applicationId: string, botToken: string) {
        this.applicationId = applicationId
        this.botToken = botToken
    }

    private isValidExecutor(
        executor: unknown
    ): executor is SlashCommandExecutor<BaseOption<string, DiscordOptionTypes, boolean>[]> {
        return executor instanceof SlashCommandExecutor
    }

    public async loadCommands(commandsDir: string = './commands/'): Promise<void> {
        const caller = parentModule()
        if (!caller) throw 'Could not find parent module when loading commands. This is likely not user error.'
        const resolvedCommandsDir = path.join(caller, commandsDir)
        const commandFiles = fs
            .readdirSync(resolvedCommandsDir, { withFileTypes: true, recursive: true })
            // Check whether file is JS or TS
            .filter((file) => file.isFile() && /^.+\.(js|mjs|ts)$/g.test(file.name))
            // Turn the file object into a path the file
            .map((file) => path.join(resolvedCommandsDir, file.parentPath, file.name))
        for (const cmdFile of commandFiles) {
            const command = await import(cmdFile)
            if (!this.isValidExecutor(command)) {
                console.warn(
                    `[WARN] File ${cmdFile} doesn't contain a valid SlashCommandExecutor export. The code exported from there (if any) will not be ran.`
                )
                continue
            }
            if (this.loadedCommands.has(command.data.name)) {
                throw `[ERR] Two commands with name ${command.data.name} found. Aborting...`
            }
            this.loadedCommands.set(command.data.name, command)
            console.log(`[INFO] Loaded command ${command.data.name}.`)
        }
    }

    public async handleInteraction(interaction: Interaction): Promise<boolean> {
        if (!interaction.isChatInputCommand()) return false
        if (!this.loadedCommands.has(interaction.commandName)) return false
        const command = this.loadedCommands.get(interaction.commandName)
        let resolvedOptions: Record<string, TypeFromDiscordOptionType<DiscordOptionTypes> | null> = {}
        if (command!.data.options) {
            for (const option of command!.data.options) {
                let value: TypeFromDiscordOptionType<typeof option.type> | null
                switch (option.type) {
                    case DiscordOptionTypes.BOOLEAN:
                        value = interaction.options.getBoolean(option.name, option.required)
                        break
                    case DiscordOptionTypes.NUMBER:
                        value = interaction.options.getNumber(option.name, option.required)
                        break
                    case DiscordOptionTypes.INTEGER:
                        value = interaction.options.getInteger(option.name, option.required)
                        break
                    case DiscordOptionTypes.STRING:
                        value = interaction.options.getString(option.name, option.required)
                        break
                    case DiscordOptionTypes.ATTACHMENT:
                        value = interaction.options.getAttachment(option.name, option.required)
                        break
                    case DiscordOptionTypes.CHANNEL:
                        value = interaction.options.getChannel(option.name, option.required)
                        break
                    case DiscordOptionTypes.MENTIONABLE:
                        value = interaction.options.getMentionable(option.name, option.required)
                        break
                    case DiscordOptionTypes.ROLE:
                        value = interaction.options.getRole(option.name, option.required)
                        break
                    case DiscordOptionTypes.USER:
                        value = interaction.options.getUser(option.name, option.required)
                }
                resolvedOptions[option.name] = value
            }
        }
        await command!.execute(resolvedOptions, interaction)
        return true
    }
}
