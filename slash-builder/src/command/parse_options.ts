import { SlashCommandBuilder } from './command';
import { BaseOption, DiscordOptionTypes } from '../options/common';
import { string } from '../options/string';
import { boolean } from '../options/boolean';
import { channel } from '../options/channel';
import { DefaultBool, NOT, Nullable } from '../utils';
import { Channel, Role, User } from 'discord.js';
import { BaseChoosableOption } from '../options/common-choosable';
import { Choice, ChoosableTypes, choice } from '../options/choices';

export type TypeFromDiscordOptionType<T extends DiscordOptionTypes> =
    T extends DiscordOptionTypes.STRING
        ? string
        : T extends DiscordOptionTypes.NUMBER | DiscordOptionTypes.INTEGER
          ? number
          : T extends DiscordOptionTypes.BOOLEAN
            ? boolean
            : object; // FIXME

export type TypeFromOption<
    T extends BaseOption<string, DiscordOptionTypes, boolean>,
> =
    T extends BaseChoosableOption<string, infer CT, boolean, infer C>
        ? C extends never
            ? never
            : C
        : TypeFromDiscordOptionType<T['type']>;

export type ParsedOptions<
    T extends readonly BaseOption<string, DiscordOptionTypes, boolean>[],
> = T extends never[]
    ? {}
    : {
          [I in T[number] as I['name']]: I extends BaseOption<
              string,
              DiscordOptionTypes,
              infer TRequired
          >
              ? Nullable<TypeFromOption<I>, NOT<DefaultBool<TRequired, false>>>
              : never;
      };