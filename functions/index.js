'use strict'
const functions = require('firebase-functions');
const config = functions.config();

const { App, ExpressReceiver } = require('@slack/bolt');
const expressReceiver = new ExpressReceiver({
    signingSecret: config.slack.signing_secret,
    endpoints: '/events'
});
const app = new App({
    receiver: expressReceiver,
    token: config.slack.bot_token
});
// Global error handler
app.error(console.log);

// Handle `/echo` command invocations
app.command('/echo-from-firebase', async ({ command, ack, say }) => {
    // Acknowledge command request
    ack();
    say(`You said "${command.text}"`);
});

// https://{your domain}.cloudfunctions.net/slack/events
exports.slack = functions.https.onRequest(expressReceiver.app);
