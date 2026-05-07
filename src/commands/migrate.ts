import RedditMigrate from "../RedditMigrate.js"
import loadCredentials from "../credentials/load.js"
import login from "../login.js"
import exportData from "../data/export.js"
import importData from "../data/import.js"
import Which from "../data/interfaces/Which.js"

export default async function migrateCommand(self: RedditMigrate) {
    const credentials = await loadCredentials(self, true)
    const oldReddit = await login(credentials, "OLD_")
    const data = await exportData(oldReddit, self.which as Which<false>)
    const newReddit = await login(credentials, "NEW_")
    await importData(newReddit, data, self.which as Which<false>)
}
