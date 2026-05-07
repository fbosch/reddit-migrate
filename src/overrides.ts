import { Command } from "commander"
import { error } from "./util.js"

type CommandOption = { flags: string }
interface OverriddenCommand extends Command {
    missingArgument(name: string): void
    optionMissingArgument(option: CommandOption): void
    missingMandatoryOptionValue(option: CommandOption): void
    unknownOption(flag: string): void
    unknownCommand(): void
}

/**
 * Override some of Commander's default methods to stick to the CLI's logging style.
 */
export default function override(command: Command): void {
    const overridden = command as OverriddenCommand
    overridden.missingArgument = (name: string) =>
        error(`Missing required argument {${name}}.`)
    overridden.optionMissingArgument = ({ flags }) =>
        error(`Option {${flags}} argument missing.`)
    overridden.missingMandatoryOptionValue = ({ flags }) =>
        error(`Required option {${flags}} not specified.`)
    overridden.unknownOption = (flag: string) => error(`Unknown option {${flag}}.`)
    overridden.unknownCommand = () => error(`Unknown command {${command.args[0]}}.`)

    // this is the only way i thought of to "remove" the help option...
    command.helpOption(`--${Math.random()}`, "")
}
