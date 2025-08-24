import yargs from 'yargs'
import {hideBin} from 'yargs/helpers'
import chalk from 'chalk'
import readlineSync from 'readline-sync'

//@ts-ignore - @types/node is installed
const argv = yargs(hideBin(process.argv)).parse()

console.log('DSC-SLASH MIGRATOR\n\n')
