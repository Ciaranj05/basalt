import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const authFormsSource = fs.readFileSync("src/components/portal/AuthForms.tsx", "utf8");
const clientLoginSource = fs.readFileSync("src/lib/portal/client-login.ts", "utf8");

test("login submits on the client and hard-navigates after session cookies are set", () => {
  assert.match(authFormsSource, /<form onSubmit=\{handleSubmit\}>/);
  assert.doesNotMatch(authFormsSource, /loginAction/);
  assert.match(clientLoginSource, /signInWithPassword/);
  assert.match(clientLoginSource, /window\.location\.assign\(destination\)/);
});

test("failed login stays on the login form and shows an error", () => {
  assert.match(clientLoginSource, /return \{ ok: false, message: "Unable to sign in with those details\." \}/);
  assert.match(authFormsSource, /if \(!result\.ok\)/);
  assert.match(authFormsSource, /setState\(\{ status: "error", message: result\.message \}\)/);
  assert.match(authFormsSource, /setPending\(false\)/);
});
