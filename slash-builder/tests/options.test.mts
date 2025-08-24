import { describe, expect, expectTypeOf, it, test } from 'vitest'
import { BooleanOptionBuilder, boolean } from '../src/options/boolean.mjs'
import { DiscordOptionTypes } from '../src/options/common.mjs'
import { SlashCommandBuilder } from '../src/command/index.mjs'
import { channel } from '../src/options/channel.mjs'

// I'LL DO TESTS LATER RAHHHHHHH
describe('Testing common (not choosable) options', () => {
    it("doesn't throw an error when all required options are filled out", () => {
        let a = boolean('dreamberd', 'bool').build()
        expect(a).toEqual<typeof a>({
            type: DiscordOptionTypes.BOOLEAN,
            name: 'dreamberd',
            description: 'bool',
        })
    })

    test('aaaa', () => {
        let a = new SlashCommandBuilder('blapo')
            .setDescription('bleep')
            .setOptions(() => [
                boolean('bleere', 'should there be a bird?').setRequired(false),
                channel('blep', 'blaro').setRequired(true),
            ])
            .onInteraction(async (options, interaction) => {})

        console.dir(a.data, { depth: null })
    })
})
