const cloudinary = require("../cloudinary");
const multer = require('multer');
const asyncHandler = require("express-async-handler");
const Listing = require('../models/Listing');

// HELPER FUNCTIONS:
// Gets listing by ID from the database
async function getListing(req, res, next) {
  let listing;
  try{
      listing = await Listing.findById(req.params.id);
      if (listing == null) {
          return res.status(404).json({ message: "Cannot find Listing" });
      }
  } catch (err) {
      return res.status(500).json({ message: err.message });
  }

  res.listing = listing;
  next();
}


// IMAGE UPLOAD HANDLERS:
// Handles the multipart form data and puts the files in local storage
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({storage: storage});

// Uploads the files to Cloudinary and adds the public image paths to the req
const uploadMultiple = asyncHandler(async (req, res, next) => {
  try {
    const images = req.files;
    console.log(images);
    const imageIDs = [];

    for (const image of images) {
      const result = await cloudinary.uploader.upload(image.path, {
        resource_type: "auto"
      });
      imageIDs.push(result.public_id);
    }
    req.paths = imageIDs;
    next();

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


module.exports = { getListing, upload, uploadMultiple };