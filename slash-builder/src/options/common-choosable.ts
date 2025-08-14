import { BaseOption, BaseOptionBuilder, DiscordOptionTypes } from './common';
import { Choice, ChoiceBuilder, ChoosableTypes } from './choices';
import { TypeFromDiscordOptionType } from '../command/parse_options';

// TODO - Choice names need to be unique: TName type for choice class + verify
// OPTIONAL - Add support for autocomplete (later)

export interface BaseChoosableOption<
    TName extends string,
    TType extends ChoosableTypes,
    TRequired extends boolean,
    TInputs extends TypeFromDiscordOptionType<TType>,
> extends BaseOption<TName, TType, TRequired> {
    readonly choices: TInputs extends never
        ? undefined
        : ReadonlyArray<Choice<TInputs>>;
}

export abstract class BaseChoosableOptionBuilder<
        TName extends string,
        TType extends ChoosableTypes,
        TRequired extends boolean,
        TInputs extends TypeFromDiscordOptionType<TType> = never,
    >
    extends BaseOptionBuilder<TName, TType, TRequired>
    implements BaseChoosableOption<TName, TType, TRequired, TInputs>
{
    declare public readonly choices: TInputs extends never
        ? undefined
        : ReadonlyArray<Choice<TInputs>>;

    protected _setChoices(choices: ChoiceBuilder<TType, TInputs>[]) {
        let built = choices.map((value) => value.build());
        Reflect.set(this, 'choices', built);
    }

    public abstract setChoices<TKeys extends TypeFromDiscordOptionType<TType>>(
        choices: () => ChoiceBuilder<TType, TKeys>[]
    ): BaseChoosableOptionBuilder<TName, TType, TRequired, TKeys>;
}
