
const AV = require('../lib/av-weapp-min.js');
class UploadFile {

  uploadImageAndGetUrl(tempFilePath) {
    var promise = new Promise(
      function(resolve, reject) {
        new AV.File('img-file', {
          blob: {
            uri: tempFilePath,
          },
        }).save().then(file => {
          resolve(file.url());
        }).catch(e => {
          reject(e.messsage);
        });
      }
    );

    return promise;  
  }
}

module.exports = UploadFile;