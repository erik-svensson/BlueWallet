/**
 * Gmail API client. Most of the code is copied from the Gmail API official documentation.
 * The original code has been migrated to JS but only the methods specific for the app are the custom ones.
 * To have it working a file "token.json" and "credentials.json" must be located in the `tests/e2e/` directory
 */
import fs from 'fs';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { Base64 } from 'js-base64';

import poll from './helpers/utils';

interface EmailSearchOptions {
  sender: string;
  subject: string;
  receiver?: string;
  searchPhrase?: string;
}

const { OAuth2 } = google.auth;

const path = require('path');

const EMAIL_NOTIFICATIONS_SENDER = 'postmaster@btcv-notifcations-email.rnd.land';
//TODO: Change Subjects after final form is agreed upon
const SUBSCRIBE_TO_NOTIFICATIONS_SUBJECT = 'Subscribe to BTCV Notifications';
const CONFIRM_EMAIL_ADDRESS_SUBJECT = 'Confirm your email for BTCV Notifications';

// The file credential.json stores user's credentials that are require to
// recreate token.json if it's missing.
const CREDENTIALS_PATH = path.resolve(__dirname, './credentials.json');

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.resolve(__dirname, './token.json');

// Load client secrets from a local file.
const readCredentials = () => {
  try {
    const credentials = fs.readFileSync(CREDENTIALS_PATH, 'utf8');

    return JSON.parse(credentials);
  } catch (error) {
    throw new Error(`Error loading client secret file: ${error.message}`);
  }
};

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
const authorize = (credentials: any) => {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new OAuth2(client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  try {
    const token = fs.readFileSync(TOKEN_PATH);

    oAuth2Client.setCredentials(JSON.parse(token.toString()));

    return oAuth2Client;
  } catch (error) {
    throw new Error(`Couldn't read token. Details: ${error.message}`);
  }
};

/** Calls Gmail API to get email id of the given sender, subject and optionally a search phrase */
const getEmailId = async (auth: OAuth2Client, options: EmailSearchOptions) => {
  const { sender, subject, receiver, searchPhrase } = options;

  const gmail = google.gmail({ version: 'v1', auth });

  const phrase = searchPhrase || '';
  const recipient = receiver || '';

  const response = await gmail.users.messages.list({
    userId: 'me',
    q: `in:all is:unread from:${sender} to:${recipient} subject:${subject} ${phrase}`,
  });

  if (response.data.messages) {
    if (!response.data.messages[0].id) {
      throw new Error(`Email ${subject} with search phrase: "${phrase}" not found.`);
    }

    return response.data.messages[0].id;
  }

  throw new Error(`Email ${subject} with search phrase: "${phrase}" not found.`);
};

/** Decodes email body (content) of the given email id. Body is encoded by default */
const getDecodedEmailBody = async (auth: OAuth2Client, emailId: string) => {
  const gmail = google.gmail({ version: 'v1', auth });

  const { data } = await gmail.users.messages.get({
    userId: 'me',
    format: 'raw',
    fields: 'raw',
    id: emailId,
  });

  if (data.raw) {
    return Base64.decode(data.raw.replace(/-/g, '+').replace(/_/g, '/'));
  }

  throw new Error("Couldn't decode email body");
};

const getEmailVerificationCode = async (auth: OAuth2Client, emailId: string) => {
  const body: string = await getDecodedEmailBody(auth, emailId);

  // TODO: Do it better later on.
  const startPincodeIndex = body.indexOf('Verification code: ') + 'Verification code: '.length;

  if (startPincodeIndex === -1) {
    throw new Error(`Couldn't extract a Verification code from the email body: ${body}`);
  }

  return body.substr(startPincodeIndex, 4);
};

const getActionVerificationCode = async (auth: OAuth2Client, emailId: string) => {
  const body = await getDecodedEmailBody(auth, emailId);

  // TODO: Do it better later on.
  const startPincodeIndex = body.indexOf('<b>') + '<b>'.length;

  if (startPincodeIndex === -1) {
    throw new Error(`Couldn't extract a pincode from the email body: ${body}`);
  }

  return body.substr(startPincodeIndex, 4);
};

/** Marks an email as read  */
const addReadLabel = async (auth: OAuth2Client, emailId: string) => {
  // Note: The function works fine but 'modify' scope isn't enabled for the token
  const gmail = google.gmail({ version: 'v1', auth });

  try {
    await gmail.users.messages.modify({
      userId: 'me',
      id: emailId,
      requestBody: {
        // addLabelIds: ['TRASH'],
        removeLabelIds: ['UNREAD'],
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const auth = authorize(readCredentials());

const gmailClient = {
  getEmailVerificationCode: async (options?: Partial<EmailSearchOptions>) => {
    const getEmailVerificationEmailFn = () =>
      getEmailId(auth, {
        sender: EMAIL_NOTIFICATIONS_SENDER,
        subject: CONFIRM_EMAIL_ADDRESS_SUBJECT,
        receiver: options?.receiver,
      });

    const emailId = await poll(getEmailVerificationEmailFn, {
      interval: 5000,
      retries: 36,
    });

    await addReadLabel(auth, emailId);

    return getEmailVerificationCode(auth, emailId);
  },

  getActionVerificationCode: async (options?: Partial<EmailSearchOptions>) => {
    const getActionVerificationEmailFn = () =>
      getEmailId(auth, {
        sender: EMAIL_NOTIFICATIONS_SENDER,
        subject: SUBSCRIBE_TO_NOTIFICATIONS_SUBJECT,
        receiver: options?.receiver,
      });

    const emailId = await poll(getActionVerificationEmailFn, {
      interval: 5000,
      retries: 36,
    });

    await addReadLabel(auth, emailId);

    return getActionVerificationCode(auth, emailId);
  },
};

export default gmailClient;
