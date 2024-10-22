const express = require('express');
const app = express();
const db = require('./db');
const passport = require('./auth');


const bodyParser = require('body-parser')
app.use(bodyParser.json())

// Middleware Funtion
// const logRequest = (req, res, next) => {
//   console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
//   next(); // Move on to the next Phase
// }
// app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', { session: false });

app.get('/', function (req, res) {
  res.send('Welcome to our Hotel')
})

// import the routers files
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes); // use the routers

// import the routers files
const menuRoutes = require('./routes/menuRoutes');
const Person = require('./models/Person');
app.use('/menu', menuRoutes); // use the routers

app.listen(3000) 