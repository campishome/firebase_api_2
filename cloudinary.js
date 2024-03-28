const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dvr5khbjt', 
    api_key: '931629694749851', 
    api_secret: '***************************' 
  });
  
module.exports = cloudinary;