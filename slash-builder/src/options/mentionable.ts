import { BaseOption, BaseOptionBuilder, DiscordOptionTypes } from "./common";

export class MentionableOptionBuilder<
    TName extends string,
    TRequired extends boolean
> extends BaseOptionBuilder<TName, DiscordOptionTypes.MENTIONABLE, TRequired> {
    public type = DiscordOptionTypes.MENTIONABLE as const;

    public setRequired<T extends boolean>(required: T) {
        Reflect.set(this, 'required', required)
        return this as unknown as MentionableOptionBuilder<TName, T>
    }

    public build() {
        return this as BaseOption<TName, DiscordOptionTypes.MENTIONABLE, TRequired>
    }
}

export function mentionable<T extends string>(name:T) {
    return new MentionableOptionBuilder(name)
}