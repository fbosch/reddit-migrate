import RedditMigrate from "../RedditMigrate.js"
import loadCredentials from "../credentials/load.js"
import login from "../login.js"
import purge from "../data/purge.js"
import Which from "../data/interfaces/Which.js"

export default async function purgeCommand(self: RedditMigrate) {
    const credentials = await loadCredentials(self, false)
    const reddit = await login(credentials)
    await purge(reddit, self.edit, self.which as Which<true>)
}
