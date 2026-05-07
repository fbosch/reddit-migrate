import RedditMigrate from "../RedditMigrate.js"
import chalk from "chalk"
import { Option } from "commander"
import { error, blue, blueString } from "../util.js"

export default function helpCommand(this: RedditMigrate, commandName: string) {
    if (
        typeof commandName !== "string" ||
        !commandName ||
        commandName.toLowerCase() === "help"
    ) {
        const commands = this.commands
            .map(
                command =>
                    `${command.name()} [options]`.padEnd(20) + blue(command.description())
            )
            .join("\n" + " ".repeat(4))

        console.log(`
${chalk.bold("Usage:")}
    reddit-migrate ${blue("[command] [options]")}

${chalk.bold("Commands:")}
    ${commands}`)
    } else {
        const command = this.commands.find(c => c.name() === commandName.toLowerCase())
        if (!command) error(`Unknown command {${commandName}}.`)

        const options = command.options
            .map(
                (option: Option) =>
                    `${option.flags}`.padEnd(24) + blue(option.description)
            )
            .join("\n" + " ".repeat(4))

        console.log(`
${command.description()}

${chalk.bold("Usage:")}
    ${command.name()} ${blue("[options]")}

${chalk.bold("Options:")}
    ${options}`)
    }
}
