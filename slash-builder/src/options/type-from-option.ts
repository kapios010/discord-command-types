import { Attachment, Channel, SlashCommandMentionableOption } from 'discord.js';
import { DiscordOptionTypes } from './common';

export type TypeFromDSCType<T extends DiscordOptionTypes> =
    T extends DiscordOptionTypes.STRING
        ? string
        : T extends DiscordOptionTypes.NUMBER | DiscordOptionTypes.INTEGER
          ? number
          : T extends DiscordOptionTypes.BOOLEAN
            ? boolean
            : string;
