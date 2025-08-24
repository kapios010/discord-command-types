import { validateStringOptionMaxLength, validateStringOptionMinLength } from '../utils/validations.mjs'
import { ChoiceBuilder } from './choices/index.mjs'
import { DiscordOptionTypes } from './common.mjs'
import { BaseChoosableOption, BaseChoosableOptionBuilder } from './common-choosable.mjs'

export interface StringOption<TName extends string, TRequired extends boolean = false, TInputs extends string = never>
    extends BaseChoosableOption<TName, DiscordOptionTypes.STRING, TRequired, TInputs> {
    readonly min_length?: number
    readonly max_length?: number
}

export class StringOptionBuilder<
        TName extends string,
        TRequired extends boolean = false,
        TInputs extends string = never,
    >
    extends BaseChoosableOptionBuilder<TName, DiscordOptionTypes.STRING, TRequired, TInputs>
    implements StringOption<TName, TRequired, TInputs>
{
    public readonly min_length?: number
    public readonly max_length?: number
    public readonly type = DiscordOptionTypes.STRING

    public setRequired<T extends boolean>(required: T) {
        Reflect.set(this, 'required', required)
        return this as unknown as StringOptionBuilder<TName, T, TInputs>
    }

    public setChoices<TKeys extends string>(callbackfn: () => ChoiceBuilder<DiscordOptionTypes.STRING, TKeys>[]) {
        let derived = this as unknown as StringOptionBuilder<TName, TRequired, TKeys>
        derived._setChoices(callbackfn())
        return derived
    }

    public setMinLength(length: number) {
        validateStringOptionMinLength(length)
        Reflect.set(this, 'min_length', length)
        return this
    }

    public setMaxLength(length: number) {
        validateStringOptionMaxLength(length)
        Reflect.set(this, 'max_length', length)
        return this
    }

    public build() {
        return this as StringOption<TName, TRequired, TInputs>
    }
}

export function string<T extends string>(name: T, description: string) {
    return new StringOptionBuilder(name, description)
}
