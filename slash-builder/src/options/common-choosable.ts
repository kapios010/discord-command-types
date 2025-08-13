import { BaseOption, BaseOptionBuilder, DiscordOptionTypes } from './common';
import { Choice, ChoiceBuilder, ChoosableTypes } from './choices';
import { TypeFromDiscordOptionType} from '../parse_options'

// TODO - Choice names need to be unique: TName type for choice class + verify
// OPTIONAL - Add support for autocomplete (later)

export interface BaseChoosableOption<
    TName extends string,
    TType extends ChoosableTypes,
    TRequired extends boolean,
    TInputs extends TypeFromDiscordOptionType<TType> = never,
> extends BaseOption<TName, TType, TRequired> {
    readonly choices: TInputs extends never ? undefined : ReadonlyArray<Choice<TType, TInputs>>;
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
    declare public readonly choices: TInputs extends never ? undefined : ReadonlyArray<Choice<TType, TInputs>>;

    protected _setChoices(
        callbackfn: (
            choice: ChoiceBuilder<TType, TInputs>
        ) => ChoiceBuilder<TType, TInputs>[]
    ) {
        let built = callbackfn(new ChoiceBuilder(this.type)).map((value) =>
            value.build()
        );
        Reflect.set(this, 'choices', built);
    }

    public abstract setChoices<TKeys extends TypeFromDiscordOptionType<TType>>(
        callbackfn: (
            choice: ChoiceBuilder<TType>
        ) => ChoiceBuilder<TType, TKeys>[]
    ): BaseChoosableOptionBuilder<TName, TType, TRequired, TKeys>;
}