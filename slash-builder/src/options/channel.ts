import { ChannelType } from 'discord.js'
import { BaseOption, BaseOptionBuilder, DiscordOptionTypes } from './common';

export interface ChannelOption<
    TName extends string
> extends BaseOption<TName, DiscordOptionTypes.CHANNEL> {
    readonly channel_types?: ReadonlyArray<ChannelType>
}

export class ChannelOptionBuilder<
    TName extends string,
> extends BaseOptionBuilder<TName, DiscordOptionTypes.CHANNEL>
implements ChannelOption<TName> {
    public readonly channel_types?: ReadonlyArray<ChannelType>;
    public type = DiscordOptionTypes.CHANNEL as const;

    public setChannelTypes(channelTypes: ChannelType[]) {
        Reflect.set(this, 'channel_types', channelTypes)
        return this
    }

    public build() {
        return this as ChannelOption<TName>
    }
}

export function channel<T extends string>(name: T) {
    return new ChannelOptionBuilder(name)
}