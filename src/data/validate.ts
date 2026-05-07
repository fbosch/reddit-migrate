import Data, { Multireddit } from "./interfaces/Data.js"
import Which from "./interfaces/Which.js"

const attributes = [
    "subscriptions",
    "follows",
    "friends",
    "blocked",
    "multireddits",
    "profile",
    "preferences"
] as const

const topLevelKeys = new Set([...attributes, "exported_at"])
const stringListAttributes = ["subscriptions", "follows", "friends", "blocked"] as const

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return !!value && typeof value === "object" && !Array.isArray(value)
}

function assertStringList(data: Record<string, unknown>, attribute: string) {
    const value = data[attribute]
    if (!Array.isArray(value) || value.some(item => typeof item !== "string"))
        throw new Error(`${attribute} must be an array of strings.`)
}

function assertSettingsObject(data: Record<string, unknown>, attribute: string) {
    if (!isPlainObject(data[attribute])) throw new Error(`${attribute} must be an object.`)
}

function assertMultireddit(value: unknown, index: number): asserts value is Multireddit {
    if (!isPlainObject(value)) throw new Error(`multireddits[${index}] must be an object.`)

    for (const key of ["name", "description", "visibility", "icon_name", "key_color", "weighting_scheme"])
        if (typeof value[key] !== "string")
            throw new Error(`multireddits[${index}].${key} must be a string.`)

    const copiedFrom = value.copied_from
    if (
        copiedFrom !== null &&
        copiedFrom !== undefined &&
        (typeof copiedFrom !== "string" || !/^user\/[^/]+\/m\/[^/]+$/.test(copiedFrom))
    )
        throw new Error(`multireddits[${index}].copied_from must be a reddit multireddit path.`)

    if (!Array.isArray(value.subreddits) || value.subreddits.some(item => typeof item !== "string"))
        throw new Error(`multireddits[${index}].subreddits must be an array of strings.`)
}

export default function validateImportData(data: unknown, which: Which): Partial<Data> {
    if (!isPlainObject(data)) throw new Error("Import data must be an object.")

    for (const key of Object.keys(data))
        if (!topLevelKeys.has(key)) throw new Error(`Unknown import data attribute: ${key}.`)

    if (data.exported_at !== undefined && typeof data.exported_at !== "string")
        throw new Error("exported_at must be a string.")

    for (const attribute of stringListAttributes)
        if (which[attribute]) assertStringList(data, attribute)

    if (which.multireddits) {
        const value = data.multireddits
        if (!Array.isArray(value)) throw new Error("multireddits must be an array.")
        value.forEach(assertMultireddit)
    }

    if (which.profile) assertSettingsObject(data, "profile")
    if (which.preferences) assertSettingsObject(data, "preferences")

    return data as Partial<Data>
}
