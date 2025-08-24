import { ChannelType } from 'discord.js'
import { BaseOption, BaseOptionBuilder, DiscordOptionTypes } from './common';

export interface ChannelOption<
    TName extends string,
    TRequired extends boolean = false
> extends BaseOption<TName, DiscordOptionTypes.CHANNEL, TRequired> {
    readonly channel_types?: ReadonlyArray<ChannelType>
}

export class ChannelOptionBuilder<
    TName extends string,
    TRequired extends boolean = false
> extends BaseOptionBuilder<TName, DiscordOptionTypes.CHANNEL,TRequired>
implements ChannelOption<TName, TRequired> {
    public readonly channel_types?: ReadonlyArray<ChannelType>;
    public type = DiscordOptionTypes.CHANNEL as const;

    public setChannelTypes(channelTypes: ChannelType[]) {
        Reflect.set(this, 'channel_types', channelTypes)
        return this
    }

    public setRequired<T extends boolean>(required: T) {
        Reflect.set(this, 'required', required)
        return this as unknown as ChannelOptionBuilder<TName, T>
    }

    public build() {
        return this as ChannelOption<TName, TRequired>
    }
}

export function channel<T extends string>(name: T, description: string) {
    return new ChannelOptionBuilder(name, description)
}