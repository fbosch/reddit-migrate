import { createRequire } from "node:module"
import { formatSuccess, error, spin } from "./util.js"
import { Credentials } from "./credentials/Credentials.js"
import Snoowrap from "snoowrap"

const require = createRequire(import.meta.url)
const pkg = require("../package.json") as { version: string }

export default async function login(
    credentials: Credentials,
    prefix: "OLD_" | "NEW_" | "" = ""
) {
    const username = credentials[prefix + "USERNAME"]
    const spinner = spin(`Attempting to login as {${username}}...`)

    const reddit = new Snoowrap({
        userAgent: `reddit-migrate@${pkg.version} | github.com/cAttte/reddit-migrate`,
        clientId: credentials[prefix + "CLIENT_ID"],
        clientSecret: credentials[prefix + "CLIENT_SECRET"],
        username: credentials[prefix + "USERNAME"],
        password: credentials[prefix + "PASSWORD"]
    })

    reddit.config({ continueAfterRatelimitError: true })

    // @ts-ignore: Snoowrap typings are broken
    await reddit.getMe().catch(() => error(`Couldn't log in as {${username}}.`))
    spinner.succeed(formatSuccess(`Successfully logged in as {${username}}.`))

    return reddit
}
