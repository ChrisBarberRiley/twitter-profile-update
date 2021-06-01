import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import sharp from 'sharp';
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

const getRecentFollowers = async () => {
  try {
    const res = await client.get('followers/list', {
      screen_name: 'chris_gbr',
      count: 3,
    });
    // console.log('res', res);
    let recentFollowerInfo = await res.users;
    let followerImages = recentFollowerInfo
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

const writeFileAsync = promisify(fs.writeFile);

async function download(url, imageName) {
  const response = await fetch(url);
  const buffer = await response.buffer();
  await writeFileAsync(imageName, buffer).then(() => {
    console.log('finished downloading!');
  });
  await sharp(`./images/${imageName}`)
    .resize(80)
    .toFile(`./images/r-${imageName}`);
}

const drawImage = async (images) => {
  try {
    images.map((image) => {
      let name = path.basename(image);
      download(image, `./images/${name}`);
    });

    const name = Math.random();

    const image = await sharp('./images/banner.jpg')
      .composite([
        {
          input: `./images/r-${path.basename(images[0])}`,
          top: 155,
          left: 1310,
        },
        {
          input: `./images/r-${path.basename(images[1])}`,
          top: 265,
          left: 1310,
        },
        {
          input: `./images/r-${path.basename(images[2])}`,
          top: 380,
          left: 1310,
        },
      ])
      .toFile(`${name}.png`);
  } catch (error) {
    console.log('error', error);
  }
};

const getRecentFollowerInfo = async () => {
  const recentFollowers = await getRecentFollowerIds();
  console.log('recentFollowers', recentFollowers);
  try {
    console.log(recentFollowers.join());
    const res = await client.get('users/show', {
      user_id: '1397404819355226000',
    });
    console.log('res', res);
  } catch (error) {
    console.log('cannot find user id', recentFollowers[0]);
    console.log('error', error);
  }
};

//changeBanner();
// getRecentFollowerInfo();
getRecentFollowers();
