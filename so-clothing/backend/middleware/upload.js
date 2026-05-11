const multer = require("multer");
const path = require("path");


// STORAGE CONFIG
const storage = multer.diskStorage({

  // UPLOAD FOLDER
  destination: (req, file, cb) => {

    cb(null, "uploads/");

  },

  // FILE NAME
  filename: (req, file, cb) => {

    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1E9) +
      path.extname(file.originalname);

    cb(null, uniqueName);

  },

});


// FILE FILTER
const fileFilter = (req, file, cb) => {

  const allowedTypes =
    /jpeg|jpg|png|webp/;

  const extname =
    allowedTypes.test(
      path.extname(file.originalname)
        .toLowerCase()
    );

  const mimetype =
    allowedTypes.test(file.mimetype);

  if (extname && mimetype) {

    cb(null, true);

  } else {

    cb(
      new Error(
        "Only images are allowed"
      )
    );

  }
};


// MULTER CONFIG
const upload = multer({

  storage,

  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },

});

module.exports = upload;