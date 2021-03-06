/**
 * Variables
 */

// Github repository owner and handle
const REPO_OWNER = "pagedip";
const REPO_HANDLE = "happy-load";

// Usernames to assign to created issues
const USERNAMES = ["tyler-johnson", "NoahWilson4", "YangusKhan", "Delvach"];

// user responsible for reviewing opened pull-requests
const REVIEWER = "tyler-johnson";

// a label assigned to the issue, used to identify previous issues
const LABEL = "loading-message-duty";

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
  token: process.env.GH_TOKEN,
});

// time right now
const now = DateTime.local();

// midnight, sunday, current week
const thisWeek = DateTime.fromObject({
  weekYear: now.weekYear,
  weekNumber: now.weekNumber - 1,
  weekday: 7,
  zone: "UTC",
});

// midnight, sunday, week before this one
const prevWeek = thisWeek.minus({ weeks: 1 });

// one week from right now
const nextWeek = now.plus({ weeks: 1 });

Promise.resolve()
  .then(async () => {
    const result = await github.issues.listForRepo({
      owner: REPO_OWNER,
      repo: REPO_HANDLE,
      filter: "all",
      state: "all",
      labels: LABEL,
      sort: "created",
      direction: "desc",
      since: prevWeek.toISO(),
      per_page: 1,
      page: 1,
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
        console.log(`Last issue was assigned to @${last.assignee.login}`);
        nextUsernameIndex =
          (USERNAMES.indexOf(last.assignee.login) + 1) % USERNAMES.length;
      }
    }

    const assignee = USERNAMES[nextUsernameIndex];
    console.log(`Assigning @${assignee} to the next issue.`);

    const basicBody = `Happy ${now.toFormat("cccc")} @${assignee}!

It's your turn to add a new loading message happy-load. Please open a pull-request referencing this issue by ${nextWeek
      .setZone("America/Denver")
      .toLocaleString(DateTime.DATETIME_FULL)}.`;

    const issue = await github.issues.create({
      owner: REPO_OWNER,
      repo: REPO_HANDLE,
      title: "Add a loading message",
      labels: [LABEL],
      assignees: [assignee],
      body: basicBody,
    });

    if (issue.status >= 400 || !issue.data) {
      throw new Error("Problem creating issue.");
    }

    const issuenum = issue.data.number;
    console.log(`Created issue #${issuenum}.`);

    const body = `${basicBody}

To add a loading message:

1. Clone this repository.
2. Checkout a new branch from master.
3. Create a new YAML file in the \`data/pagedip\` directory with your loading message.
4. Add a feature to \`RELEASE.yml\` so a minor version will be published.

This file should have the following format:

\`\`\`yaml
text: My loading message.
subtext: Something extra below the message.
\`\`\`

Here are some other recommendations:

- The name of the file is the message ID. It should be unique and relative to the loading message itself.
- Don't plagarize other service's loading messages! It is okay to find inspiration, but all messages should be original.

When ready, open a new pull-request into the \`master\` branch. Take a look at #11 for an example pull-request.

- [ ] Added a new loading message.
- [ ] Added a feature to the \`RELEASE.yml\` file.
- [ ] Commited with \`closes #${issuenum}\` in the message to automatically close this issue when merged.
- [ ] Opened a pull-request against master and assigned @${REVIEWER} to review and merge.`;

    await github.issues.update({
      owner: REPO_OWNER,
      repo: REPO_HANDLE,
      number: issuenum,
      body,
    });

    console.log("Done.");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
