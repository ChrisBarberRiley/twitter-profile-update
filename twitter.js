import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const api = axios.create({
  baseURL: 'https://api.twitter.com/1.1',
  headers: {
    Authorization: `OAuth oauth_consumer_key="${process.env.consumer_key}",oauth_token="${process.env.access_token}",,oauth_signature_method="H,MAC-SHA1",,oauth_timestamp="1,515677408",,oauth_nonce="nonce",,oauth_version="1.0",,oauth_signature="p2GZ%2BbkaXGxWROCM%2FzcK08eysQc%3D"`,
  },
  withCredentials: true,
});

const getListStatuses = (owner_screen_name, slug) => {
  return api.get('/lists/statuses.json', { owner_screen_name, slug });
};

getListStatuses('chris_gbr', 'chris_gbr');
