import { BaseOption, BaseOptionBuilder, DiscordOptionTypes } from "./common";

export class AttachmentOptionBuilder<
    TName extends string,
    TRequired extends boolean = false
> extends BaseOptionBuilder<TName, DiscordOptionTypes.ATTACHMENT, TRequired> {
    public type = DiscordOptionTypes.ATTACHMENT as const;

    public setRequired<T extends boolean>(required: T) {
        Reflect.set(this, 'required', required)
        return this as unknown as AttachmentOptionBuilder<TName, T>
    }

    public build() {
        return this as BaseOption<TName, DiscordOptionTypes.ATTACHMENT, TRequired>
    }
}

export function attachment<T extends string>(name: T, description: string) {
    return new AttachmentOptionBuilder(name, description)
}