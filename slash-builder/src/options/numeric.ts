import { validateInteger } from '../Validations';
import { ChoiceBuilder } from './choices/choices';
import { DiscordOptionTypes } from './common';
import {
    BaseChoosableOption,
    BaseChoosableOptionBuilder,
} from './common-choosable';

export interface NumericOption<TName extends string, TInputs extends number>
    extends BaseChoosableOption<
        TName,
        DiscordOptionTypes.NUMBER | DiscordOptionTypes.INTEGER,
        TInputs
    > {
    readonly min_value?: number;
    readonly max_value?: number;
}

export class NumericOptionBuilder<TName extends string, TInputs extends number>
    extends BaseChoosableOptionBuilder<
        TName,
        DiscordOptionTypes.NUMBER | DiscordOptionTypes.INTEGER,
        TInputs
    >
    implements NumericOption<TName, TInputs>
{
    public readonly min_value?: number;
    public readonly max_value?: number;
    public readonly type:
        | DiscordOptionTypes.INTEGER
        | DiscordOptionTypes.NUMBER;

    constructor(
        name: TName,
        type: DiscordOptionTypes.INTEGER | DiscordOptionTypes.NUMBER
    ) {
        super(name);
        this.type = type;
    }

    public setChoices<TKeys extends number>(
        callbackfn: (
            choice: ChoiceBuilder<
                DiscordOptionTypes.INTEGER | DiscordOptionTypes.NUMBER,
                number
            >
        ) => ChoiceBuilder<
            DiscordOptionTypes.INTEGER | DiscordOptionTypes.NUMBER,
            TKeys
        >[]
    ) {
        let derived = this as unknown as NumericOptionBuilder<TName, TKeys>;
        derived._setChoices(callbackfn);
        return derived;
    }

    public setMinValue(value: number) {
        if (this.type == DiscordOptionTypes.INTEGER) validateInteger(value);
        Reflect.set(this, 'min_value', value);
        return this;
    }

    public setMaxValue(value: number) {
        if (this.type == DiscordOptionTypes.INTEGER) validateInteger(value);
        Reflect.set(this, 'min_value', value);
        return this;
    }

    public build() {
        return this as NumericOption<TName, TInputs>;
    }
}

export function integer<T extends string>(name: T) {
    return new NumericOptionBuilder(name, DiscordOptionTypes.INTEGER);
}

export function number<T extends string>(name: T) {
    return new NumericOptionBuilder(name, DiscordOptionTypes.NUMBER);
}
