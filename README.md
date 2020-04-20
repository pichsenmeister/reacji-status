# reacji-status

A simple Slack app that updates your Slack status to the latest emoji reaction on one of your messages.

This app uses the [Bolt for Slack](https://slack.dev/bolt/concepts) framework.

## Slack app configuration

1. Create an [app](https://api.slack.com/apps) on Slack
2. Enable `Event Subscription`
  - Subscribe to `events on behalf of a user`: `reaction_added`
3. Add `User Token Scopes` in `OAuth & Permissions`
  - `reactions:read`
  - `users.profile:write`
4. Install App

## Run the app

1. Install dependencies via `npm` or `yarn`
2. Create a `.env` file and with following keys
  - `SLACK_SIGNING_SECRET=<your Slack app's signing secret>`
  - `SLACK_TOKEN=<your Slack app's user token>`
