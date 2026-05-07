import { Command } from "commander"
import Which from "./data/interfaces/Which.js"

/**
 * Sub-class of Command that types the command's options.
 */
export default class RedditMigrate extends Command {
    envFile?: string
    which: Which<true> | Which<false>
    input?: string
    output?: string
    pretty?: boolean
    overwrite?: boolean
    edit?: string
}
