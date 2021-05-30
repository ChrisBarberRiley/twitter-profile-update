import dotenv from 'dotenv';
import Twitter from 'twitter';

dotenv.config();

// Twitter handle
const HANDLE = '@chris_gbr';

const credentials = {
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret,
};

export const client = new Twitter(credentials);
// var params = { screen_name: 'chris_gbr' };
// client.get(
//   'statuses/user_timeline',
//   params,
//   function (error, tweets, response) {
//     console.log(tweets);
//   },
// );

export default client;
