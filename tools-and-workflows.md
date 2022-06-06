# Tools and workflows
This is a stub. The goal is to list some commonly used tools and workflows. Please edit this page directly.

## Tools for communication
Because Vac is collaborating with many different teams we use different communication mediums for different areas of work.

The primary ones are that you'll use on a daily basis are:

- Vac Discord
- Github (issues, PRs, etc)

Here's a non-exhaustive list of other tools that are used:
- Command line Waku app (for dogfooding)
- Status and Nimbus discord (for conversations related to Status and Nimbus)
- Status app
- Vac Forum (for long term posts)
- Status
- Telegram (for example in collaboration with other projects)
- Signal (for example in collaboration with other projects)
- Google Meet (for video calls)

## Work principles

- Async over sync (atemporal vs temporal, different timezones)
- Public over private
- Proactively reaching out vs waiting for something to happen or asking for permission

For example, if you have a problem it is better to create a Github issue, try to solve it yourself and ping a few people.

## Workflows

When it comes to code contributions we are generally quite process-light, but follow generally accepted principles around separation of concerns, testing code etc. As well as:

- Kanban style development with Github project boards
- Trunk based development https://trunkbaseddevelopment.com/ and small, incremental PRs
- Don't break master (revert commit, then fix)
- 1-2 PR reviews

Please squash to a single commit and rebase before merging to `master` (Github's `Squash and Merge` option for PRs is sufficient). Use a [semantic commit message](chore/update-submodules) for the merged commit. We also use code signing for commits.

For Nim development, follow the [Status Nim style guide](https://status-im.github.io/nim-style-guide/).

It is expected that you watch your GH inbox and do PR reviews every day in order to unblock other team members.

## Channel overview

This is a stub and should eventually contain a brief overview of various channels.