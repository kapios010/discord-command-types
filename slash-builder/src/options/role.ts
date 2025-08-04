import { BaseOption, BaseOptionBuilder, DiscordOptionTypes } from "./common";

export class RoleOptionBuilder<
    TName extends string
> extends BaseOptionBuilder<TName, DiscordOptionTypes.ROLE> {
    public type = DiscordOptionTypes.ROLE as const;

    public build() {
        return this as BaseOption<TName, DiscordOptionTypes.ROLE>
    }
}

export function role<T extends string>(name: T) {
    return new RoleOptionBuilder(name)
}