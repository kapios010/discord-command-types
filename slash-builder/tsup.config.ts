import { defineConfig} from 'tsup'

export default defineConfig({
    entry: {
        index: 'src/index.mts',
        'options/*': 'src/options/*.mts',
        'options/choices': 'src/options/choices/index.mts',
        command: 'src/command/index.mts',
        'command/data': 'src/command/data.mts',
        'command/options_parser': 'src/command/options_parser.mts'
    },
    format: [ 'esm', 'cjs'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true
})