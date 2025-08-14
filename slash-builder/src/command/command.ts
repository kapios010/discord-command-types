import { ChatInputCommandInteraction, Locale, TextBasedChannel } from 'discord.js';
import { SlashCommandExecutor, SlashCommandMigratorData } from './command_data';
import { BaseOption, BaseOptionBuilder, DiscordOptionTypes } from '../options/common';
import { validateDescription, validateName } from '../utils/Validations';
import { ParsedOptions } from './parse_options';
import { string } from '../options/string';

export const SCOPE_GLOBAL: unique symbol = Symbol('Global');

export class SlashCommandBuilder<
    TOptions extends BaseOption<
        string,
        DiscordOptionTypes,
        boolean
    >[] = never[],
> implements SlashCommandMigratorData<TOptions>
{
    public readonly name: string;
    public readonly description: string;
    public readonly description_localizations?: Partial<Record<Locale, string>>;
    public readonly name_localizations?: Partial<Record<Locale, string>>;
    public readonly scope: string[] | 'GLOBAL';
    public readonly nsfw?: boolean;
    public readonly options: TOptions extends never[] ? undefined : TOptions;

    constructor(name: string) {
        validateName(name);
        this.name = name
    }

    /**
     * Adds a localization of the option name
     * @param locale - The language of the localization
     * @param name - The localized name, adhering to {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-naming | Discord's naming scheme}
     */
    public addNameLocalization<TLocale extends Locale>(
        locale: TLocale extends keyof this['name_localizations']
            ? never
            : TLocale,
        name: string
    ) {
        validateName(name);
        if (typeof this.name_localizations === 'undefined')
            Reflect.set(this, 'name_localizations', {});
        Reflect.set(this.name_localizations!, locale, name);
        return this;
    }

    public setDescription(description: string) {
        validateDescription(description);
        Reflect.set(this, 'description', description);
        return this;
    }

    /**
     * Adds a translation of the option description.
     * @param locale - The language of the translation
     * @param description - The content of the translation
     */
    public addDescriptionLocalization<TLocale extends Locale>(
        locale: TLocale extends keyof this['description_localizations']
            ? never
            : TLocale,
        description: string
    ) {
        validateDescription(description);
        if (typeof this.description_localizations === 'undefined')
            Reflect.set(this, 'description_localizations', {});
        Reflect.set(this.description_localizations!, locale, description);
        return this;
    }

    /**
     * @param scope - `GLOBAL` (symbol) if it's a global command, otherwise array of guild IDs
     */
    public setScope(scope: string | typeof SCOPE_GLOBAL) {
        Reflect.set(this, 'scope', scope);
        return this;
    }

    public setNSFW(nsfw: boolean) {
        Reflect.set(this, 'nsfw', nsfw);
    }

    public setOptions<
        TLOptions extends BaseOptionBuilder<string, DiscordOptionTypes, boolean>[],
    >(callbackfn: () => TLOptions) {
        const derived = this as unknown as SlashCommandBuilder<TLOptions>;
        Reflect.set(derived, 'options', callbackfn().map((value) => value.build()));
        return derived;
    }

    public onInteraction(
        callback: (
            options: ParsedOptions<TOptions>,
            interaction: ChatInputCommandInteraction
        ) => void
    ): SlashCommandExecutor<TOptions> {
        return {
            data: this as SlashCommandMigratorData<TOptions>,
            execute: callback,
        };
    }
}
