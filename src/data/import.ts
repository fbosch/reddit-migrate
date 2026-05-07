import Snoowrap from "snoowrap"
import importSubscriptions from "./import/subscriptions.js"
import importFriends from "./import/friends.js"
import importBlocked from "./import/blocked.js"
import importMultireddits from "./import/multireddits.js"
import importProfile from "./import/profile.js"
import importPreferences from "./import/preferences.js"
import Data from "./interfaces/Data.js"
import Which from "./interfaces/Which.js"

export default async function importData(reddit: Snoowrap, data: Partial<Data>, which: Which) {
    if (which.subscriptions || which.follows)
        await importSubscriptions(
            reddit,
            which.subscriptions ? data.subscriptions : null,
            which.follows ? data.follows : null
        )

    if (which.friends) await importFriends(reddit, data.friends)
    if (which.blocked) await importBlocked(reddit, data.blocked)
    if (which.multireddits) await importMultireddits(reddit, data.multireddits)
    if (which.profile) await importProfile(reddit, data.profile)
    if (which.preferences) await importPreferences(reddit, data.preferences)
}
