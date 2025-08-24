import { validateInteger } from '../utils/validations.mjs'
import { ChoiceBuilder } from './choices/index.mjs'
import { DiscordOptionTypes } from './common.mjs'
import { BaseChoosableOption, BaseChoosableOptionBuilder } from './common-choosable.mjs'

export interface NumericOption<TName extends string, TRequired extends boolean = false, TInputs extends number = never>
    extends BaseChoosableOption<TName, DiscordOptionTypes.NUMBER | DiscordOptionTypes.INTEGER, TRequired, TInputs> {
    readonly min_value?: number
    readonly max_value?: number
}

export class NumericOptionBuilder<
        TName extends string,
        TRequired extends boolean = false,
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
    public readonly min_value?: number
    public readonly max_value?: number
    public readonly type: DiscordOptionTypes.INTEGER | DiscordOptionTypes.NUMBER

    constructor(name: TName, description: string, type: DiscordOptionTypes.INTEGER | DiscordOptionTypes.NUMBER) {
        super(name, description)
        this.type = type
    }

    public setRequired<T extends boolean>(required: T) {
        Reflect.set(this, 'required', required)
        return this as unknown as NumericOptionBuilder<TName, T, TInputs>
    }

    public setChoices<TKeys extends number>(callbackfn: () => ChoiceBuilder<typeof this.type, TKeys>[]) {
        let derived = this as unknown as NumericOptionBuilder<TName, TRequired, TKeys>
        derived._setChoices(callbackfn())
        return derived
    }

    public setMinValue(value: number) {
        if (this.type == DiscordOptionTypes.INTEGER) validateInteger(value)
        Reflect.set(this, 'min_value', value)
        return this
    }

    public setMaxValue(value: number) {
        if (this.type == DiscordOptionTypes.INTEGER) validateInteger(value)
        Reflect.set(this, 'min_value', value)
        return this
    }

    public build() {
        return this as NumericOption<TName, TRequired, TInputs>
    }
}

export function integer<T extends string>(name: T, description: string) {
    return new NumericOptionBuilder(name, description, DiscordOptionTypes.INTEGER)
}

export function number<T extends string>(name: T, description: string) {
    return new NumericOptionBuilder(name, description, DiscordOptionTypes.NUMBER)
}
