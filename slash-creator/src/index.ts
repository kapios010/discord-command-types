import {
  ChatInputCommandInteraction,
  SlashCommandBuilder as DJS_SlashBuilder,
  SlashCommandBooleanOption,
  SlashCommandMentionableOption,
  SlashCommandOptionsOnlyBuilder,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandGroupBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";

export class SlashCommandBuilder {
    public applicationID: string;
    public name: string

    constructor(applicationID: string) {
        this.applicationID = applicationID
    }

    public setName(name:string) {
        if(name.length < 1 || name.length > 32) throw new Error('Length of command name must be 1-32 characters long.')
        this.name = name
        return this
    }
}

let a = new SlashCommandBuilder('1')
.setName('a')