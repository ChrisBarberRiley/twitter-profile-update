import fs from 'fs';
import T from './config.js';

// T.get(
//   'search/tweets',
//   { q: 'banana since:2011-07-11', count: 10 },
//   function (err, data, response) {
//     console.log(data);
//   },
// );

// Set profile image
// imageToBase64('./profile_img.jpg') // Image URL
//   .then((image) => {
//     console.log(image); // "iVBORw0KGgoAAAANSwCAIA..."

//     T.post(
//       'account/update_profile_image',
//       { image },
//       function (err, data, response) {
//         console.log(data);
//       },
//     );
//   })
//   .catch((error) => {
//     console.log(error); // Logs an error if there was one
//   });

// // Set banner image
// imageToBase64('./test.jpg') // Image URL
//   .then((image) => {
//     // console.log(image); // "iVBORw0KGgoAAAANSwCAIA..."

//     T.post(
//       'account/update_profile_banner',
//       { banner: image },
//       function (err, data, response) {
//         console.log(data);
//         console.log('response', response);
//         console.log('err', err);
//       },
//     );
//   })
//   .catch((error) => {
//     console.log(error); // Logs an error if there was one
//   });

const changeBanner = async () => {
  console.log('Updating banner!');
  try {
    const images = fs.readdirSync('./images');
    const img = fs.readFileSync('./images/' + images[0]).toString('base64');
    await T.post(
      'account/update_profile_banner',
      { image: img },
      (err, data, response) => {
        console.log('data', data);
      },
    );
  } catch (err) {
    console.log('Update failed:', err);
  }
};

changeBanner();

// T.get(
//   'users/profile_banner',
//   { user_id: '331379561' },
//   function (err, data, response) {
//     console.log(data);
//   },
// );
