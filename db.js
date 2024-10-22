const mongoose = require('mongoose');

// Definr the MongoDB connection URL
const mongoURL = 'mongodb://localhost:70/hotels' // Your mongodb database URL

// Set up MongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Get the default connection
// mongoose maintains a default connection object representing the MongoDB connection.

const db = mongoose.connection;

// define event listener for database connection

db.on('connected', () => {
    console.log('Connected to MongoDB server');
})

db.on('error', (err) => {
    console.log('MongoDB Connection error:', err);
})

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
})

// Exports the database connection
module.exports = db;