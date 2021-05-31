import fs from 'fs';
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

const drawImage = async (images) => {
  try {
    // console.log('images', images);
    // mergeImages(
    //   [
    //     { src: './images/banner.jpg', x: 0, y: 0 },
    //     { src: images[0], width: 64, height: 64, x: -200, y: 0 },
    //     { src: images[1], width: 64, height: 64, x: -600, y: 0 },
    //     { src: images[2], width: 64, height: 64, x: -900, y: 0 },
    //   ],
    //   {
    //     Canvas: Canvas,
    //     Image: Image,
    //   },
    // ).then((b64) => console.log('b64', b64));

    const name = Math.random();
    await sharp('./images/banner.jpg')
      .composite([{ input: images[2], top: 450, left: 450 }])
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
