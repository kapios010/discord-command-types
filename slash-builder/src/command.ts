import { Locale } from 'discord.js';
import { SlashCommandMigratorData } from './command_data';
import { BaseOption, DiscordOptionTypes } from './options/common';
import { validateDescription, validateName } from './utils/Validations';

export class SlashCommandBuilder<
    TOptions extends BaseOption<string, DiscordOptionTypes, boolean>,
> implements SlashCommandMigratorData<TOptions>
{
    public readonly name: string;
    public readonly description: string;
    public readonly description_localizations?: Partial<Record<Locale, string>>;
    public readonly name_localizations?: Partial<Record<Locale, string>>;
    public readonly scope: string[] | 'GLOBAL';
    public readonly nsfw?: boolean;
    public readonly options: TOptions extends never ? undefined : TOptions[];

    public setName(name: string) {
        validateName(name);
        Reflect.set(this, 'name', name);
        return this;
    }

    public setDescription(description: string) {
        validateDescription(description);
        Reflect.set(this, 'description', description);
        return this;
    }

    /**
     * @param scope - `GLOBAL` if it's a global command, otherwise array of guild IDs
     */
    public setScope(scope: string[] | 'GLOBAL') {
        Reflect.set(this, 'scope', scope)
        return this
    }

    public setNSFW(nsfw: boolean) {
        Reflect.set(this, 'nsfw', nsfw)
    }

    public setOptions<TLOptions extends BaseOption<string, DiscordOptionTypes, boolean>>(options: TLOptions[]) {
        const derived = this as unknown as SlashCommandBuilder<TLOptions>
        Reflect.set(derived, 'options', options)
        return derived
    }

    public execute(callback: (options: any, interaction: any) => void) {
        return {
            data: this as SlashCommandMigratorData<TOptions>,
            interaction: callback
        }
    }
}