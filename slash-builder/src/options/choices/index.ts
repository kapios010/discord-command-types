import { Locale } from 'discord.js';
import { DiscordOptionTypes } from '../common';
import { validateChoiceName, validateName } from '../../utils/Validations';
import { TypeFromDiscordOptionType } from '../../parse_options';

export type ChoosableTypes =
    | DiscordOptionTypes.STRING
    | DiscordOptionTypes.NUMBER
    | DiscordOptionTypes.INTEGER;

export interface Choice<
    TType extends ChoosableTypes = ChoosableTypes,
    TValue extends
        TypeFromDiscordOptionType<TType> = TypeFromDiscordOptionType<TType>,
> {
    name: string;
    name_localizations?: Partial<Record<Locale, string>>;
    value: TValue;
}

export class ChoiceBuilder<
    TType extends ChoosableTypes,
    TValue extends
        TypeFromDiscordOptionType<TType> = TypeFromDiscordOptionType<TType>,
> implements Choice<TType, TValue>
{
    declare public readonly name: string;
    declare public readonly value: TValue;
    declare public readonly name_localizations?: Partial<
        Readonly<Record<Locale, string>>
    >;

    constructor(type: TType) {}

    public setValue<TLValue extends TypeFromDiscordOptionType<TType>>(
        value: TLValue
    ) {
        // You know I thought using 'as unknown as X' was bad but then I saw that discord.js did something for options
        // It's probably still bad
        let changed = this as unknown as ChoiceBuilder<TType, TLValue>;
        Reflect.set(changed, 'name', this.name);
        Reflect.set(changed, 'name_localizations', this.name_localizations);
        Reflect.set(changed, 'value', value);
        return changed;
    }

    public setName(name: string) {
        validateChoiceName(name);
        Reflect.set(this, 'name', name);
        return this;
    }

    public addNameLocalization<TLocale extends Locale>(
        locale: TLocale extends keyof this['name_localizations']
            ? never
            : TLocale,
        name: string
    ) {
        validateChoiceName(name);
        if (typeof this.name_localizations === 'undefined')
            Reflect.set(this, 'name_localizations', {});
        Reflect.set(this.name_localizations!, locale, name);
        return this;
    }

    /**
     * @internal
     */
    public build() {
        return this as Choice<TType, TValue>;
    }
}

export type ChoiceKeys<T extends readonly Choice[]> = T[number]['value'];
