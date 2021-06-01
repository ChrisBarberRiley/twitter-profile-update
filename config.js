import dotenv from 'dotenv';
import Twitter from 'twitter';

dotenv.config();

const credentials = {
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret,
};

const client = new Twitter(credentials);

export default client;
