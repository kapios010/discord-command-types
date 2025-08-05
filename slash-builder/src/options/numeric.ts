import { validateInteger } from '../utils/Validations';
import { ChoiceBuilder } from './choices';
import { DiscordOptionTypes } from './common';
import {
    BaseChoosableOption,
    BaseChoosableOptionBuilder,
} from './common-choosable';

export interface NumericOption<
    TName extends string,
    TRequired extends boolean,
    TInputs extends number,
> extends BaseChoosableOption<
        TName,
        DiscordOptionTypes.NUMBER | DiscordOptionTypes.INTEGER,
        TRequired,
        TInputs
    > {
    readonly min_value?: number;
    readonly max_value?: number;
}

export class NumericOptionBuilder<
        TName extends string,
        TRequired extends boolean,
        TInputs extends number = never,
    >
    extends BaseChoosableOptionBuilder<
        TName,
        DiscordOptionTypes.NUMBER | DiscordOptionTypes.INTEGER,
        TRequired,
        TInputs
    >
    implements NumericOption<TName, TRequired, TInputs>
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

    public setRequired<T extends boolean>(required: T) {
        Reflect.set(this, 'required', required);
        return this as unknown as NumericOptionBuilder<TName, T, TInputs>;
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
        let derived = this as unknown as NumericOptionBuilder<
            TName,
            TRequired,
            TKeys
        >;
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
        return this as NumericOption<TName, TRequired, TInputs>;
    }
}

export function integer<T extends string>(name: T) {
    return new NumericOptionBuilder(name, DiscordOptionTypes.INTEGER);
}

export function number<T extends string>(name: T) {
    return new NumericOptionBuilder(name, DiscordOptionTypes.NUMBER);
}
