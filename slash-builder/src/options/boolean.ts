import { BaseOption, BaseOptionBuilder, DiscordOptionTypes } from "./common";

export class BooleanOptionBuilder<
    TName extends string
> extends BaseOptionBuilder<TName, DiscordOptionTypes.BOOLEAN> {
    public type = DiscordOptionTypes.BOOLEAN as const;

    public build(): BaseOption<TName, DiscordOptionTypes.BOOLEAN> {
        return this as BaseOption<TName, DiscordOptionTypes.BOOLEAN>
    }
}

export function boolean<T extends string>(name: T) {
    return new BooleanOptionBuilder(name)
}