import { SlashCommandBuilder } from './command';
import { BaseOption, DiscordOptionTypes } from './options/common';
import { string } from './options/string';
import { boolean } from './options/boolean'
import { channel } from './options/channel'
import { NOT } from './utils';
import { Channel, Role, User } from 'discord.js';
import { BaseChoosableOption } from './options/common-choosable';
import { Choice, ChoiceKeys, ChoosableTypes } from './options/choices';

export type TypeFromDiscordOptionType<T extends DiscordOptionTypes> =
    T extends DiscordOptionTypes.STRING
        ? string
        : T extends DiscordOptionTypes.NUMBER | DiscordOptionTypes.INTEGER
          ? number
          : T extends DiscordOptionTypes.BOOLEAN
            ? boolean
            : object // FIXME

export type TypeFromOption<T extends BaseOption<string, DiscordOptionTypes, boolean>> =
    T extends BaseChoosableOption<string, infer CT, boolean, infer C>
    ? C extends never ? never : C
    : TypeFromDiscordOptionType<T['type']>

export type Nullable<
    T extends any,
    CanBeNull extends boolean,
> = CanBeNull extends true ? T | null : T;

export type FalseByDefault<T extends boolean | undefined> = T extends undefined
    ? false
    : T;

export type ParsedOptions<
    T extends readonly BaseOption<string, DiscordOptionTypes, boolean>[],
> = T extends never[]
    ? {}
    : {
          [I in T[number] as I['name']]: Nullable<
              TypeFromOption<I>,
              NOT<FalseByDefault<I['required']>>
          >;
      };


let a = new SlashCommandBuilder()
.setName('blap')
.setOptions([
    string('bap').setRequired(false).setChoices((choice) => [choice.setValue('blarp'), choice.setValue('bleep')]),
    boolean('yap'),
    channel('brap').setRequired(false)
])
.onInteraction((options, interaction) => {

})