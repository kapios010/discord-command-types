import { Locale } from 'discord.js';
import { validateName } from './validations';

export class SlashCommandBuilder {
    /**
     * The name of this command
     */
    public readonly name!: string;

    /**
     * The description of this command
     */
    public readonly description!: string;

    public readonly nameLocalizations: Map<Locale, string> = new Map();

    public setName(name: string) {
        validateName(name);
        Reflect.set(this, 'name', name);
        return this;
    }

    public addNameLocalization(localization: Locale, localizedName: string) {
        return this;
    }
}
