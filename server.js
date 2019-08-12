const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
// const DATABASE_URL = process.env.DATABASE_URL;

// const db = knex({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
//   }
// });

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'Alexpower',
    password: '',
    database: 'smart-brain'
  }
})

// db.select('*').from('users').then(console.log);

const saltRounds = 10; // 2^10 = 1024  increase this if you want more iterates
// const password = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

app.use(cors());
app.use(bodyParser.json())

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user (new created)
/profile/:id --> GET = user
/image --> PUT = count
*/

app.get('/', (req, res) => { res.json('it is working') })

// Signin
app.post('/signin', (res, req) => {signin.handleSignin(res, req, db, bcrypt)});

// register
app.post('/register', register.handleRegister(db, bcrypt, saltRounds));


// Profile
app.get('/profile/:id', profile.handleProfileGet(db))

// IMAGE --> entries
app.put('/image', image.handleImage(db))
app.post('/imageurl', image.handleAPIKey);


// LISTEN PORT
// bash way to define a PORT : PORT=3000 node server.js
// fish way to define a PORT : env DATABASE_URL=3000 node server.js

app.listen( 3000, ()=> {
    console.log(`server is listening on port 3000...`)
  })  
  // heroku way

// const PORT = process.env.PORT || 3000

//   app.listen( PORT, ()=> {
//     console.log(`server is listening on port ${PORT}...`)
//   })  
