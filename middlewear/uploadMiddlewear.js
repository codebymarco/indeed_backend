const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');

// Define storage configuration for multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Define file filter for multer to accept image types
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/tiff', 'image/bmp', 'image/svg+xml'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only image files are allowed.'), false);
    }
};

// Create and export the multer upload middleware
const uploadPhoto = multer({ storage, fileFilter });

module.exports = uploadPhoto;
