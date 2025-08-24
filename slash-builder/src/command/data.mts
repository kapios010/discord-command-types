import { Base, ChatInputCommandInteraction, Locale, SlashCommandBuilder } from 'discord.js'
import { BaseOption, DiscordOptionTypes } from '../options/common.mjs'
import { NumericOption, integer } from '../options/numeric.mjs'
import { ParsedOptions } from './options_parser.mjs'
import { SCOPE_GLOBAL } from './index.mjs'

export enum IntegrationTypes {
    GUILD_INSTALL,
    USER_INSTALL,
}

export enum ContextTypes {
    GUILD,
    BOT_DM,
    PRIVATE_CHANNEL,
}

export interface SlashCommandMigratorData<TOptions extends BaseOption<string, DiscordOptionTypes, boolean>[]> {
    name: string
    name_localizations?: Partial<Record<Locale, string>>
    description?: string
    description_localizations?: Partial<Record<Locale, string>>
    scope: string | typeof SCOPE_GLOBAL
    options?: TOptions
    // default_member_permissions - I don't understand this so it goes unimplemented for now
    nsfw?: boolean
    // integration_types - Uninplemented for now
    // contexts - Unimplemented for now
}

export interface SlashCommandExecutor<TOptions extends BaseOption<string, DiscordOptionTypes, boolean>[]> {
    data: SlashCommandMigratorData<TOptions>
    execute: (options: ParsedOptions<TOptions>, interaction: ChatInputCommandInteraction) => Promise<void>
}

export class SlashCommandExecutor<TOptions extends BaseOption<string, DiscordOptionTypes, boolean>[]>
    implements SlashCommandExecutor<TOptions>
{
    constructor(executor: SlashCommandExecutor<TOptions>) {
        this.data = executor.data
        this.execute = executor.execute
    }
}
