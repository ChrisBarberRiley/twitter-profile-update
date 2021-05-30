import fs from 'fs';
import client from './config.js';

const changeBanner = async () => {
  console.log('Updating banner!');

  try {
    const images = fs.readdirSync('./images');
    const img = fs.readFileSync('./images/' + images[0], {
      encoding: 'base64',
    });

    await client.post(
      'account/update_profile_banner',
      { banner: img },
      (err, data, response) => {
        console.log('err', err);
        const json = response.toJSON();
        console.log(json.statusCode, json.headers, json.body);
      },
    );
  } catch (err) {
    console.log('Update failed:', err);
  }
};

changeBanner();
