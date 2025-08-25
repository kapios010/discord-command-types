import { Base, Client, Collection, Interaction } from 'discord.js'
import { SlashCommandExecutor, SlashCommandMigratorData } from './command/data.mjs'
import { BaseOption, DiscordOptionTypes } from './options/common.mjs'
import * as path from 'path'
import * as fs from 'fs'
import parentModule from 'parent-module'
import { TypeFromDiscordOptionType } from './command/options_parser.mjs'

export class SlashCommandHandler {
    public readonly loadedCommands: Collection<
        string,
        SlashCommandExecutor<BaseOption<string, DiscordOptionTypes, boolean>[]>
    > = new Collection<
    string,
    SlashCommandExecutor<BaseOption<string, DiscordOptionTypes, boolean>[]>
    >()

    private isValidExecutor(
        executor: unknown
    ): executor is SlashCommandExecutor<BaseOption<string, DiscordOptionTypes, boolean>[]> {
        return ("data" in (executor as any) && "execute" in (executor as any))
    }

    public loadCommands(commandsDir: string = './commands/', relative: boolean = true): void {
        let resolvedCommandsDir: string
        if(relative) {
            const caller = parentModule()
            if (!caller) throw 'Could not find parent module when loading commands. This is likely not user error.'
            resolvedCommandsDir = path.join(caller, commandsDir)
        } else {
            resolvedCommandsDir = commandsDir
        }

        const commandFiles = fs
            .readdirSync(resolvedCommandsDir, { withFileTypes: true, recursive: true })
            // Check whether file is JS or TS
            .filter((file) => file.isFile() && /^.+\.(js|mjs|ts)$/g.test(file.name))
            // Turn the file object into a path the file
            .map((file) => path.join(file.parentPath, file.name))
        for (const cmdFile of commandFiles) {
            const command = require(cmdFile)
            if (!this.isValidExecutor(command.default)) {
                console.warn(
                    `[WARN] File ${cmdFile} doesn't contain a valid SlashCommandExecutor export. The code exported from there (if any) will not be ran.`
                )
                continue
            }
            const commandDefault: SlashCommandExecutor<BaseOption<string, DiscordOptionTypes, boolean>[]> = command.default
            if (this.loadedCommands.has(commandDefault.data.name)) {
                throw `[ERR] Two commands with name ${commandDefault.data.name} found. Aborting...`
            }
            this.loadedCommands.set(commandDefault.data.name, commandDefault)
            console.log(`[INFO] Loaded command ${commandDefault.data.name}.`)
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
                // Do you like my teeny tiny switch statement??? Yeah, me neither. (but don't tell it that)
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
