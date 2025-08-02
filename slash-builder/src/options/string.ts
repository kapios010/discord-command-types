import { ChoiceBuilder } from './choices';
import { BaseOption, DiscordOptionTypes } from './common';
import {
    BaseChoosableOption,
    BaseChoosableOptionBuilder,
} from './common-choosable';

interface StringOption<TName extends string>
    extends BaseChoosableOption<TName, DiscordOptionTypes.STRING, string> {
    min_length?: number;
    max_length?: number;
}

export class StringOptionBuilder<TName extends string, TInputs extends string>
    extends BaseChoosableOptionBuilder<
        TName,
        DiscordOptionTypes.STRING,
        TInputs
    >
    implements StringOption<TName>
{
    declare public readonly;
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

    public build() {
        return this as StringOption<TName>;
    }
}

export function string<T extends string>(name: T) {
    return new StringOptionBuilder(name);
}