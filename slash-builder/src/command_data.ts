import { Locale } from 'discord.js';
import { BaseOption, DiscordOptionTypes } from './options/common';
import { NumericOption, integer } from './options/numeric';

export enum IntegrationTypes {
    GUILD_INSTALL,
    USER_INSTALL,
}

export enum ContextTypes {
    GUILD,
    BOT_DM,
    PRIVATE_CHANNEL,
}

export interface SlashCommandMigratorData<
    TOptions extends BaseOption<string, DiscordOptionTypes, boolean>,
> {
    name: string;
    name_localizations?: Partial<Record<Locale, string>>;
    description: string;
    description_localizations?: Partial<Record<Locale, string>>;
    scope: string[] | 'GLOBAL';
    options: TOptions extends never ? undefined : TOptions[];
    // default_member_permissions - I don't understand this so it goes unimplemented for now
    nsfw?: boolean;
    // integration_types - Uninplemented for now
    // contexts - Unimplemented for now
}
