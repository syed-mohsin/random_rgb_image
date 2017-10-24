// Canvas image creation code adapted from: https://stackoverflow.com/questions/22823752/creating-image-from-array-in-javascript-and-html5
(function() {
  var width = 128,
      height = 128,
      requiredNums = width * height * 3,
      fetchedNums = 0,
      limit = 10000; // api limit for random.org

  // this buffer will contain RGBA values for the random bitmap image
  var RandomNumArray = [];

  // fetch random numbers from Random.org
  var url = 'https://www.random.org/integers',
      num = limit,
      min = 0,
      max = 255,
      arr = [];

  var requiredRequests = Math.ceil((width * height * 4) / limit);

  var requestPromise = $.ajax({
    url: `${url}/?base=10&num=${num}&min=${min}&max=${max}&col=1&format=plain&rnd=new`
  });

  // create an array of promises
  var requestPromises = Array(requiredRequests).fill(null).map(function(_) {
    return requestPromise;
  })

  // wait for all requests to complete before parsing responses
  Promise.all(requestPromises)
  .then(function(responses) {
    for (var i=0; i<responses.length; i++) {
      arr = responses[i].split('\n').map(function(rNum) {
        return parseInt(rNum);
      });

      arr.splice(-1); // remove last empty element
      RandomNumArray = RandomNumArray.concat(arr);
    }

    // Each pixel represented by 4 values, R, G, B, A in this buffer
    // trim the RandomNumArray to correct size
    var buffer = RandomNumArray.slice(0, width * height * 4);
    renderRandomImage(buffer);
  })
  .catch(function(err) {
    console.log(err);
    $('.errors').append('<b>Oops! Likely reached random number limit!</b>');
  });


  function renderRandomImage(buffer) {
    // fetch and fill canvas element
    var canvas = $('#canvas').get(0),
        ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    var imageData = ctx.createImageData(width, height);

    // set buffer as image source data
    imageData.data.set(buffer);

    // update canvas with new data
    ctx.putImageData(imageData, 0, 0);
  }

}());
