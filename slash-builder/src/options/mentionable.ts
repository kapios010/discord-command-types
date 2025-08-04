import { BaseOption, BaseOptionBuilder, DiscordOptionTypes } from "./common";

export class MentionableOptionBuilder<
    TName extends string
> extends BaseOptionBuilder<TName, DiscordOptionTypes.MENTIONABLE> {
    public type = DiscordOptionTypes.MENTIONABLE as const;

    public build() {
        return this as BaseOption<TName, DiscordOptionTypes.MENTIONABLE>
    }
}

export function mentionable<T extends string>(name:T) {
    return new MentionableOptionBuilder(name)
}