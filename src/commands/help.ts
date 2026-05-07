import RedditMigrate from "../RedditMigrate"
import chalk from "chalk"
import commander from "commander"
import { error, blue, blueString } from "../util"

export default function helpCommand(this: RedditMigrate, commandName: string) {
    if (
        typeof commandName !== "string" ||
        !commandName ||
        commandName.toLowerCase() === "help"
    ) {
        console.log(chalk`
{bold Usage:}
    reddit-migrate {${blueString} [command] [options]}

{bold Commands:}
    ${this.commands
        .map(
            command =>
                `${command.name()} [options]`.padEnd(20) + blue(command.description())
        )
        .join("\n" + " ".repeat(4))}`)
    } else {
        const command = this.commands.find(c => c.name() === commandName.toLowerCase())
        if (!command) error(`Unknown command {${commandName}}.`)

        console.log(chalk`
${command.description()}

{bold Usage:}
    ${command.name()} {${blueString} [options]}

{bold Options:}
    ${command.options
        .map((option: commander.Option) => `${option.flags}`.padEnd(24) + blue(option.description))
        .join("\n" + " ".repeat(4))}`)
    }
}
