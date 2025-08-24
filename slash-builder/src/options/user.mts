import { BaseOption, BaseOptionBuilder, DiscordOptionTypes } from './common.mjs'

export class UserOptionBuilder<TName extends string, TRequired extends boolean = false> extends BaseOptionBuilder<
    TName,
    DiscordOptionTypes.USER,
    TRequired
> {
    public type = DiscordOptionTypes.USER as const

    public setRequired<T extends boolean>(required: T) {
        Reflect.set(this, 'required', required)
        return this as unknown as UserOptionBuilder<TName, T>
    }

    public build() {
        return this as BaseOptionBuilder<TName, DiscordOptionTypes.USER, TRequired>
    }
}

export function user<T extends string>(name: T, description: string) {
    return new UserOptionBuilder(name, description)
}
