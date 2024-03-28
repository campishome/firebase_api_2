const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const app = express();

// Configure Multer to store uploaded files in memory
const upload = multer({ storage: multer.memoryStorage() });

// Configure Cloudinary
cloudinary.config({ 
    cloud_name: 'dvr5khbjt', 
    api_key: '931629694749851', 
    api_secret: 'yKIcIjbORbf2X9-v6FbPXsrQrDA' 
});

// Route for uploading image
app.post('/upload', upload.single('image'), (req, res) => {
  // Upload image to Cloudinary
  cloudinary.uploader.upload(req.file.path, { resource_type: 'image' }, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
    // Image uploaded successfully, return the URL
    res.json({ imageUrl: result.secure_url });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
