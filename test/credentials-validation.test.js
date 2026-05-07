import assert from "node:assert/strict"
import test from "node:test"

import validateCredentials from "../dist/credentials/validate.js"

test("accepts valid usernames and passwords", () => {
    assert.equal(validateCredentials("USERNAME", "valid_user", undefined), true)
    assert.equal(validateCredentials("PASSWORD", "hunter2", undefined), true)
})

test("rejects invalid usernames", () => {
    assert.equal(
        validateCredentials("USERNAME", "ab", undefined),
        "Username must be between 3 and 20 characters."
    )
})

test("rejects reusing old username during migration", () => {
    assert.equal(
        validateCredentials("NEW_USERNAME", "same_user", "same_user"),
        "New username can't be the same as old one."
    )
})

test("rejects short passwords", () => {
    assert.equal(
        validateCredentials("PASSWORD", "short", undefined),
        "Password must be at least 6 characters long."
    )
})
