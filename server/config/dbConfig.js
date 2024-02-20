const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);
const connection = mongoose.connection;

//verify connection
connection.on('connected', () => {
    console.log('MongoDB connected successfully');
})

//handle error
connection.on('error', (err) => {
    console.log('MongoDB connection error: ' + err)
})