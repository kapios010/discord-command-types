import { DiscordOptionTypes } from "./common";
import { BaseChoosableOption } from "./common-choosable";

export interface NumericOption<TName extends string>
    extends BaseChoosableOption<TName, DiscordOptionTypes.NUMBER | DiscordOptionTypes.INTEGER, number> {
    min_value?: number;
    max_value?: number;
}