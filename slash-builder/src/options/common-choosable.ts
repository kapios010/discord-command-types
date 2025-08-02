import { BaseOption, BaseOptionBuilder, DiscordOptionTypes } from './common';
import { Choice, ChoiceBuilder, ChoiceInput, ChoosableTypes } from './choices';

// TODO - Choice names need to be unique: TName type for choice class + verify
// OPTIONAL - Add support for autocomplete (later)

export interface BaseChoosableOption<
    TName extends string,
    TType extends ChoosableTypes,
    TInputs extends ChoiceInput<TType>,
> extends BaseOption<TName, TType> {
    choices?: ReadonlyArray<Choice<TType, TInputs>>;
}

export abstract class BaseChoosableOptionBuilder<
        TName extends string,
        TType extends ChoosableTypes,
        TInputs extends ChoiceInput<TType>,
    >
    extends BaseOptionBuilder<TName, TType>
    implements BaseChoosableOption<TName, TType, TInputs>
{
    declare public readonly choices?: ReadonlyArray<Choice<TType, TInputs>>;

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

    public abstract setChoices<TKeys extends ChoiceInput<TType>>(
        callbackfn: (
            choice: ChoiceBuilder<TType>
        ) => ChoiceBuilder<TType, TKeys>[]
    ): BaseChoosableOptionBuilder<TName, TType, TKeys>;
}