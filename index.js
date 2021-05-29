// T.get(
//   'search/tweets',
//   { q: 'banana since:2011-07-11', count: 10 },
//   function (err, data, response) {
//     console.log(data);
//   },
// );

// T.post(
//   'statuses/update',
//   { status: 'hello world!' },
//   function (err, data, response) {
//     console.log(data);
//   },
// );

function toDataURL(src, callback, outputFormat) {
  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function () {
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var dataURL;
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
  };
  img.src = src;
  if (img.complete || img.complete === undefined) {
    img.src =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
    img.src = src;
  }
}

toDataURL('./main.png', function (dataUrl) {
  console.log('RESULT:', dataUrl);
});
