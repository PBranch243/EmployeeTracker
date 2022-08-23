//import express
const express = require('express');
// designate port and assign express() to the app
const PORT = process.env.PORT || 3001;
const app = express();
// add express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());




// start the server
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});
