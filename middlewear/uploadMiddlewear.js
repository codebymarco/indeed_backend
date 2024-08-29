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

// Define file filter for multer
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['application/pdf', 'application/doc', 'application/docx'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// Create and export the multer upload middleware
const upload = multer({ storage, fileFilter });

module.exports = upload;