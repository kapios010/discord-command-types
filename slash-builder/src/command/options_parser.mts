import { BaseOption, DiscordOptionTypes } from '../options/common.mjs'
import type {
    APIInteractionDataResolvedChannel,
    APIInteractionDataResolvedGuildMember,
    APIRole,
    Attachment,
    GuildBasedChannel,
    GuildMember,
    Role,
    User,
} from 'discord.js'
import { BaseChoosableOption } from '../options/common-choosable.mjs'

// Is there a better way to do this?
export type TypeFromDiscordOptionType<T extends DiscordOptionTypes> = T extends DiscordOptionTypes.STRING
    ? string
    : T extends DiscordOptionTypes.NUMBER | DiscordOptionTypes.INTEGER
      ? number
      : T extends DiscordOptionTypes.BOOLEAN
        ? boolean
        : T extends DiscordOptionTypes.ATTACHMENT
          ? Attachment
          : T extends DiscordOptionTypes.CHANNEL
            ? GuildBasedChannel | APIInteractionDataResolvedChannel
            : T extends DiscordOptionTypes.ROLE
              ? Role | APIRole
              : T extends DiscordOptionTypes.USER
                ? User
                : // The only other type, MENTIONABLE
                  User | Role | APIRole | GuildMember | APIInteractionDataResolvedGuildMember

export type TypeFromOption<T extends BaseOption<string, DiscordOptionTypes, boolean>> =
    T extends BaseChoosableOption<string, infer CT, boolean, infer C>
        ? C extends never
            ? never
            : C
        : TypeFromDiscordOptionType<T['type']>

export type ParsedOptions<T extends readonly BaseOption<string, DiscordOptionTypes, boolean>[]> = T extends never[]
    ? {}
    : {
          [I in T[number] as I['name']]: I extends BaseOption<string, DiscordOptionTypes, infer R>
              ? R extends true
                  ? TypeFromOption<I>
                  : TypeFromOption<I> | null
              : never
      }
