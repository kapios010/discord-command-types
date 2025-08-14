import { Locale } from 'discord.js';
import { validateDescription, validateName } from '../utils/Validations';

/**
 * Type of command option, excluding `SUB_COMMAND = 1` and `SUB_COMMAND_GROUP = 2`
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type}
 */
export enum DiscordOptionTypes {
    'STRING' = 3,
    'INTEGER' = 4,
    'BOOLEAN' = 5,
    'USER' = 6,
    'CHANNEL' = 7,
    'ROLE' = 8,
    'MENTIONABLE' = 9,
    'NUMBER' = 10,
    'ATTACHMENT' = 11,
}

/**
 * Config data of an option
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure}
 */
export interface BaseOption<
    TName extends string,
    TType extends DiscordOptionTypes,
    TRequired extends boolean,
> {
    /**
     * Type of the option
     * @see {@linkcode DiscordOptionTypes}
     */
    readonly type: TType;
    /**
     * The name of the option
     */
    readonly name: TName;
    /**
     * The localized names of the option
     */
    readonly name_localizations?: Partial<Readonly<Record<Locale, string>>>;
    /**
     * The description of the option
     */
    readonly description: string;
    /**
     * The localized descriptions of the option
     */
    readonly description_localizations?: Partial<
        Readonly<Record<Locale, string>>
    >;
    /**
     * Whether the option is required
     */
    readonly required?: TRequired;
}

export abstract class BaseOptionBuilder<
    TName extends string,
    TType extends DiscordOptionTypes,
    TRequired extends boolean,
> implements BaseOption<TName, TType, TRequired>
{
    public abstract readonly type: TType;
    public readonly name: TName;
    public readonly name_localizations?: Partial<
        Readonly<Record<Locale, string>>
    >;
    public readonly description: string;
    public readonly description_localizations?: Partial<
        Readonly<Record<Locale, string>>
    >;
    public readonly required?: TRequired;

    /**
     * @param name - The option name adhering to {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-naming | Discord's naming scheme}
     */
    constructor(name: TName, description: string) {
        validateName(name);
        validateDescription(description);
        this.name = name
        this.description = description
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
     * Changes whether the option is required or optional
     * @param required - true if required
     */
    public abstract setRequired<T extends boolean>(
        required: T
    ): BaseOptionBuilder<TName, TType, T>;

    /* @internal */
    public abstract build(): BaseOption<TName, TType, TRequired>;
}
