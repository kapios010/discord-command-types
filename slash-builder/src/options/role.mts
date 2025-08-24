import { BaseOption, BaseOptionBuilder, DiscordOptionTypes } from './common.mjs'

export class RoleOptionBuilder<TName extends string, TRequired extends boolean = false> extends BaseOptionBuilder<
    TName,
    DiscordOptionTypes.ROLE,
    TRequired
> {
    public type = DiscordOptionTypes.ROLE as const

    public setRequired<T extends boolean>(required: T) {
        Reflect.set(this, 'required', required)
        return this as unknown as RoleOptionBuilder<TName, T>
    }

    public build() {
        return this as BaseOption<TName, DiscordOptionTypes.ROLE, TRequired>
    }
}

export function role<T extends string>(name: T, description: string) {
    return new RoleOptionBuilder(name, description)
}
