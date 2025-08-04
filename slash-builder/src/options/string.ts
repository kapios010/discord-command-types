import {
    validateStringOptionMaxLength,
    validateStringOptionMinLength,
} from '../Validations';
import { ChoiceBuilder } from './choices/choices';
import { DiscordOptionTypes } from './common';
import {
    BaseChoosableOption,
    BaseChoosableOptionBuilder,
} from './common-choosable';

export interface StringOption<TName extends string, TInputs extends string>
    extends BaseChoosableOption<TName, DiscordOptionTypes.STRING, TInputs> {
    readonly min_length?: number;
    readonly max_length?: number;
}

export class StringOptionBuilder<
        TName extends string,
        TInputs extends string = never,
    >
    extends BaseChoosableOptionBuilder<
        TName,
        DiscordOptionTypes.STRING,
        TInputs
    >
    implements StringOption<TName, TInputs>
{
    public readonly min_length?: number;
    public readonly max_length?: number;
    public readonly type = DiscordOptionTypes.STRING;

    public setChoices<TKeys extends string>(
        callbackfn: (
            choice: ChoiceBuilder<DiscordOptionTypes.STRING, string>
        ) => ChoiceBuilder<DiscordOptionTypes.STRING, TKeys>[]
    ): StringOptionBuilder<TName, TKeys> {
        let derived = this as unknown as StringOptionBuilder<TName, TKeys>;
        derived._setChoices(callbackfn);
        return derived;
    }

    public setMinLength(length: number) {
        validateStringOptionMinLength(length);
        Reflect.set(this, 'min_length', length);
        return this;
    }

    public setMaxLength(length: number) {
        validateStringOptionMaxLength(length);
        Reflect.set(this, 'max_length', length);
        return this;
    }

    public build() {
        return this as StringOption<TName, TInputs>;
    }
}

export function string<T extends string>(name: T) {
    return new StringOptionBuilder(name);
}
