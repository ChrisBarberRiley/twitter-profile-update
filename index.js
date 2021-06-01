import axios from 'axios';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import client from './config.js';

const downloadImages = async (images) => {
  const promises = images.map(async (image) => {
    const name = path.basename(image);
    const input = (await axios({ url: image, responseType: 'arraybuffer' }))
      .data;

    const roundedCorners = Buffer.from(
      '<svg><rect x="0" y="0" width="80" height="80" rx="80" ry="80"/></svg>',
    );

    await sharp(input)
      .resize(80, 80)
      .composite([
        {
          input: roundedCorners,
          blend: 'dest-in',
        },
      ])
      .png()
      .toFile(`./images/followers/r-${name}`);
  });

  return Promise.all(promises);
};

const changeBanner = async (name) => {
  console.log('Updating banner!');

  try {
    fs.readdirSync('./images');
    const img = fs.readFileSync(`./images/made/${name}`, {
      encoding: 'base64',
    });

    await client.post(
      'account/update_profile_banner',
      { banner: img },
      (err, data, response) => {
        console.log('err', err);
        const json = response.toJSON();
        console.log(json.statusCode, json.headers, json.body);

        try {
          console.log('removing ', `./images/made/${name}`);
          fs.unlinkSync(`./images/made/${name}`);

          console.log('removing follower images');
          const followerImages = fs.readdirSync('./images/followers/');
          followerImages.map((img) =>
            fs.unlinkSync(`./images/followers/${img}`),
          );
        } catch (error) {
          console.log(error);
        }
      },
    );
  } catch (err) {
    console.log('Update failed:', err);
  }
};

const drawImage = async (images) => {
  try {
    await downloadImages(images);

    const name = Math.random();
    console.log('images', images);
    await sharp('./images/banner.jpg')
      .composite([
        {
          input: `./images/followers/r-${path.basename(images[0])}`,
          top: 155,
          left: 1310,
          width: 60,
          height: 60,
        },
        {
          input: `./images/followers/r-${path.basename(images[1])}`,
          top: 265,
          left: 1310,
          width: 60,
          height: 60,
        },
        {
          input: `./images/followers/r-${path.basename(images[2])}`,
          top: 380,
          left: 1310,
          width: 60,
          height: 60,
        },
      ])
      .toFile(`./images/made/${name}.png`);

    changeBanner(`${name}.png`);
  } catch (error) {
    console.log('error', error);
  }
};

const getRecentFollowers = async () => {
  try {
    const res = await client.get('followers/list', {
      screen_name: 'chris_gbr',
      count: 3,
    });
    // console.log('res', res);
    const recentFollowerInfo = await res.users;
    const followerImages = recentFollowerInfo
      .filter((follower) => follower.profile_image_url.length > 0)
      .map((follower) => follower.profile_image_url.replace('_normal', ''));
    // console.log('followerImages', followerImages);
    drawImage(followerImages);
  } catch (error) {
    console.log('error', error);
  }

  // const recentFollowerIds = await res.ids.slice(0, 3);

  // return res.ids;
};

getRecentFollowers();
