// Canvas image creation code adapted from: https://stackoverflow.com/questions/22823752/creating-image-from-array-in-javascript-and-html5
(function() {
  var width = 128,
      height = 128,
      // each pixel represented by 4 values, R, G, B, A
      buffer = new Uint8ClampedArray(width * height * 4);

  for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {

          // position in buffer based on i and j
          var pos = (i * width + j) * 4;

          buffer[pos] = Math.floor(Math.random() * 256);  // R
          buffer[pos+1] = Math.floor(Math.random() * 256);  // G
          buffer[pos+2] = Math.floor(Math.random() * 256);  // B
          buffer[pos+3] = 255;  // A
      }
  }

  // create off-screen canvas element
var canvas = $('#canvas').get(0),
    ctx = canvas.getContext('2d');

canvas.width = width;
canvas.height = height;

var imageData = ctx.createImageData(width, height);

// set buffer as image source data
imageData.data.set(buffer);

// update canvas with new data
ctx.putImageData(idata, 0, 0);
}());
