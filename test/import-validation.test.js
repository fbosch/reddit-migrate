const assert = require("node:assert/strict")
const test = require("node:test")

const validateImportData = require("../dist/data/validate").default

const all = {
    subscriptions: true,
    follows: true,
    friends: true,
    blocked: true,
    multireddits: true,
    profile: true,
    preferences: true
}

function validData() {
    return {
        exported_at: "2026-05-07T00:00:00.000Z",
        subscriptions: ["typescript"],
        follows: ["some_user"],
        friends: ["friend_user"],
        blocked: ["blocked_user"],
        multireddits: [
            {
                name: "dev",
                description: "Development",
                visibility: "private",
                icon_name: "code",
                key_color: "#000000",
                weighting_scheme: "classic",
                copied_from: "user/source/m/dev",
                subreddits: ["typescript", "node"]
            }
        ],
        profile: { title: "Profile title" },
        preferences: { threaded_messages: true }
    }
}

test("accepts exported data for selected attributes", () => {
    const data = validData()

    assert.equal(validateImportData(data, all), data)
})

test("rejects unknown top-level attributes", () => {
    const data = { ...validData(), token: "secret" }

    assert.throws(() => validateImportData(data, all), /Unknown import data attribute: token/)
})

test("rejects malformed string lists before account mutation", () => {
    const data = { ...validData(), friends: ["friend_user", 42] }

    assert.throws(() => validateImportData(data, all), /friends must be an array of strings/)
})

test("rejects malformed multireddit copy paths before import", () => {
    const data = validData()
    data.multireddits[0].copied_from = "../../not-a-multireddit"

    assert.throws(
        () => validateImportData(data, all),
        /multireddits\[0\]\.copied_from must be a reddit multireddit path/
    )
})

test("only validates selected attributes", () => {
    const data = { friends: ["friend_user"], subscriptions: [42] }

    assert.equal(validateImportData(data, { friends: true }), data)
})
