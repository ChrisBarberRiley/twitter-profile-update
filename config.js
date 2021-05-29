import dotenv from 'dotenv';
import Twit from 'twit';

dotenv.config();

export const T = new Twit({
  consumer_key: process.env.api_key,
  consumer_secret: process.env.api_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
});

export default T;
