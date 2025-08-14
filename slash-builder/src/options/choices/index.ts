import { Locale } from 'discord.js';
import { DiscordOptionTypes } from '../common';
import { validateChoiceName, validateName } from '../../utils/Validations';
import { TypeFromDiscordOptionType } from '../../command/parse_options';

export type ChoosableTypes =
    | DiscordOptionTypes.STRING
    | DiscordOptionTypes.NUMBER
    | DiscordOptionTypes.INTEGER;

export interface Choice<
    TValue extends
        TypeFromDiscordOptionType<DiscordOptionTypes> = TypeFromDiscordOptionType<DiscordOptionTypes>,
> {
    name: string;
    name_localizations?: Partial<Record<Locale, string>>;
    value: TValue;
}

export class ChoiceBuilder<
    TType extends ChoosableTypes,
    TValue extends
        TypeFromDiscordOptionType<TType> = TypeFromDiscordOptionType<TType>,
> implements Choice<TValue>
{
    declare public readonly name: string;
    declare public readonly value: TValue;
    declare public readonly name_localizations?: Partial<
        Readonly<Record<Locale, string>>
    >;

    constructor(name: string, value: TValue) {
        this.name = name;
        this.value = value;
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
        return this as Choice<TValue>;
    }
}

export function choice<
    TType extends ChoosableTypes,
    TValue extends TypeFromDiscordOptionType<TType>,
>(name: string, value: TValue): ChoiceBuilder<TType, TValue> {
    return new ChoiceBuilder(name, value);
}
