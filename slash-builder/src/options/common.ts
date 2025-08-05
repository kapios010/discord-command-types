import { Locale } from 'discord.js';
import { validateDescription, validateName } from '../utils/Validations';

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

export interface BaseOption<
    TName extends string,
    TType extends DiscordOptionTypes,
    TRequired extends boolean,
> {
    readonly type: TType;
    readonly name: TName;
    readonly name_localizations?: Partial<Readonly<Record<Locale, string>>>;
    readonly description: string;
    readonly description_localizations?: Partial<
        Readonly<Record<Locale, string>>
    >;
    readonly required?: TRequired;
}

export abstract class BaseOptionBuilder<
    TName extends string,
    TType extends DiscordOptionTypes,
    TRequired extends boolean,
> implements BaseOption<TName, TType, TRequired>
{
    public abstract readonly type: TType;
    declare public readonly name: TName;
    declare public readonly name_localizations?: Partial<
        Readonly<Record<Locale, string>>
    >;
    declare public readonly description: string;
    declare public readonly description_localizations?: Partial<
        Readonly<Record<Locale, string>>
    >;
    declare public readonly required: TRequired;

    constructor(name: TName) {
        validateName(name);
        Reflect.set(this, 'name', name);
    }

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

    public abstract setRequired<T extends boolean>(
        required: T
    ): BaseOptionBuilder<TName, TType, T>;

    /**
     * @internal
     */
    public abstract build(): BaseOption<TName, TType, TRequired>;
}
