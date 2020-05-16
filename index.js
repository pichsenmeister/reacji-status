require("dotenv").config();
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  ignoreSelf: false
});

app.event("reaction_added", async ({ event, context }) => {
  const auth = await app.client.auth.test({
    token: context.botToken
  });

  // only update status if it's a reaction by someone else
  // and if it's on a message sent by myself
  if (auth.user_id !== event.user && auth.user_id === event.item_user) {
    await app.client.users.profile.set({
      token: context.botToken,
      profile: {
        status_text: `via <@${event.user}>`,
        status_emoji: `:${event.reaction}:`,
        // let status expire after 1 hour
        status_expiration: ((new Date()).getTime()/1000)+3600
      }
    });
  }
});

app.error(error => {
  console.error(error);
});

// Start your app
(async () => {
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
