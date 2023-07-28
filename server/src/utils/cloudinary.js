const cloudinary = require("cloudinary").v2;
const async = require("async");

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  ssl_detected: false,
});

const uploadFile = (file, options) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, options, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const uploadFiles = async (media, options) => {
  try {
    const uploadTasks = media.map((mediaFile, index) => {
      return (callback) => {
        uploadFile(mediaFile, options)
          .then((result) =>
            callback(null, {
              publicId: result.public_id,
              secureUrl: result.secure_url,
              type: result.resource_type,
              index,
            })
          )
          .catch((error) => callback(error));
      };
    });

    const results = await new Promise((resolve, reject) => {
      async.parallel(uploadTasks, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
    return results;
  } catch (error) {
    throw error;
  }
};

async function deleteFromCloudinary(publicIdOfFile) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicIdOfFile, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

const deleteFiles = async (media) => {
  try {
    const uploadTasks = media.map((mediaFile, index) => {
      return (callback) => {
        deleteFromCloudinary(mediaFile.publicId)
          .then((result) =>
            callback(null, {
              result: result.result,
            })
          )
          .catch((error) => callback(error));
      };
    });

    const results = await new Promise((resolve, reject) => {
      async.parallel(uploadTasks, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = { uploadFiles, deleteFiles };
