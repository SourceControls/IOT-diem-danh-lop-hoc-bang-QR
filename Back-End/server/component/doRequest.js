let request = require('request');
function doRequest(url, data) {
  return new Promise((resolve, reject) => {
    request.post(url, { json: data },
      function (error, res, body) {
        if (!error) {
          resolve(body)
        } else {
          reject(error);
        }
      }
    )
  });
}

module.exports = doRequest;