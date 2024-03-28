const express = require('express');
require('dotenv').config()
const uploadRoute = require('./controller/routeUpload');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());


//the route 
app.use("/api/users" , uploadRoute);


//posrt connection 
// app.listen(PORT, () => {
//   console.log(`listening at http://localhost:${PORT}`);
// });

module.exports = app;
//cloudinary account:  https://cloudinary.com/signup