import { BaseOption, BaseOptionBuilder, DiscordOptionTypes } from "./common";

export class AttachmentOptionBuilder<
    TName extends string
> extends BaseOptionBuilder<TName, DiscordOptionTypes.ATTACHMENT> {
    public type = DiscordOptionTypes.ATTACHMENT as const;

    public build() {
        return this as BaseOption<TName, DiscordOptionTypes.ATTACHMENT>
    }
}

export function attachment<T extends string>(name: T) {
    return new AttachmentOptionBuilder(name)
}