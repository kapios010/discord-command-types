import { BaseOption, BaseOptionBuilder, DiscordOptionTypes } from "./common";

export class BooleanOptionBuilder<
    TName extends string,
    TRequired extends boolean
> extends BaseOptionBuilder<TName, DiscordOptionTypes.BOOLEAN, TRequired> {
    public type = DiscordOptionTypes.BOOLEAN as const;

    public setRequired<T extends boolean>(required: T) {
        Reflect.set(this, 'required', required)
        return this as unknown as BooleanOptionBuilder<TName, T>
    }

    public build() {
        return this as BaseOption<TName, DiscordOptionTypes.BOOLEAN, TRequired>
    }
}

export function boolean<T extends string>(name: T) {
    return new BooleanOptionBuilder(name)
}