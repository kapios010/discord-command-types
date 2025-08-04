import { BaseOption, BaseOptionBuilder, DiscordOptionTypes } from "./common";

export class UserOptionBuilder<
    TName extends string
> extends BaseOptionBuilder<TName, DiscordOptionTypes.USER> {
    public type = DiscordOptionTypes.USER as const;

    public build() {
        return this as BaseOptionBuilder<TName, DiscordOptionTypes.USER>
    }
}

export function user<T extends string>(name: T) {
    return new UserOptionBuilder(name)
}