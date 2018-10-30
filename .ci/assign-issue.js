/**
 * Variables
 */

// Github repository owner and handle
const REPO_OWNER = "pagedip";
const REPO_HANDLE = "happy-load";

// Usernames to assign to created issues
const USERNAMES = [
  "tyler-johnson",
  "NoahWilson4",
  "YangusKhan"
];

// user responsible for reviewing opened pull-requests
const REVIEWER = "tyler-johnson";

// a label assigned to the issue, used to identify previous issues
const LABEL = "loading-message-duty-test";

/**
 * Script
 */

const Github = require("@octokit/rest");
const { DateTime } = require("luxon");

if (!process.env.GH_TOKEN) {
  throw new Error("Missing GH_TOKEN env var.");
}

const github = new Github();
github.authenticate({
  type: "token",
  token: process.env.GH_TOKEN
});

const now = DateTime.local();
const thisWeek = DateTime.fromObject({
  weekYear: now.weekYear,
  weekNumber: now.weekNumber-1,
  weekday: 7,
  zone: "UTC"
});
const prevWeek = thisWeek.minus({ weeks: 1 });
const nextWeek = thisWeek.plus({ weeks: 1 });

Promise.resolve().then(async () => {
  const result = await github.issues.getForRepo({
    owner: REPO_OWNER,
    repo: REPO_HANDLE,
    filter: "all",
    state: "all",
    labels: LABEL,
    sort: "created",
    direction: "desc",
    since: prevWeek.toISO(),
    per_page: 1,
    page: 1
  });

  let nextUsernameIndex = 0;

  if (result.data && result.data.length) {
    const last = result.data[0];
    const created = DateTime.fromISO(last.created_at);

    if (created >= thisWeek) {
      console.warn("Already created an issue for this week.");
      return;
    }

    // round-robin assign for the next issue
    if (last.assignee) {
      console.log(`Last issue was assigned to ${last.assignee.login}`);
      nextUsernameIndex = (USERNAMES.indexOf(last.assignee.login) + 1) % USERNAMES.length;
    }
  }

  const assignee = USERNAMES[nextUsernameIndex];
  console.log(`Assigning @${assignee} to the next issue.`);

  const basicBody = `Happy ${now.toFormat("cccc")} @${assignee}!

It's your turn to add a new loading message happy-load. Please open a pull-request referencing this issue by ${nextWeek.setZone("America/Denver").toLocaleString(DateTime.DATETIME_FULL)}.`;

  const issue = await github.issues.create({
    owner: REPO_OWNER,
    repo: REPO_HANDLE,
    title: "Add a loading message",
    labels: [ LABEL ],
    assignees: [ assignee ],
    body: basicBody
  });

  if (issue.status >= 400 || !issue.data) {
    throw new Error("Problem creating issue.");
  }

  const issuenum = issue.data.number;
  console.log(`Created issue #${issuenum}.`);

  const body = `${basicBody}

To add a loading message:

1. Clone this repository.
2. Create a new branch from master.
3. Add a new YAML file to the \`data/pagedip\` directory.

This file should have the following format:

\`\`\`yaml
text: My loading message.
subtext: Something extra below the message.
\`\`\`

Here are some other recommendations:

- The name of the file is the message ID. It should be unique and relative to the loading message itself.
- Don't plagarize other service's loading messages! It is okay to find inspiration, but all messages should be original.

When ready, open a new pull-request into the \`master\` branch.

- Add \`closes #${issuenum}\` to your commit message to automatically close this issue when merged.
- Reference this commit (#${issuenum}) in your pull-request message.
- Assign @tyler-johnson so I can review and merge it.`;

  await github.issues.edit({
    owner: REPO_OWNER,
    repo: REPO_HANDLE,
    number: issuenum,
    body
  });

  console.log("Done.");
}).catch(e => {
  console.error(e);
  process.exit(1);
});
