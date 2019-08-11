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


const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'Alexpower',
    password: '',
    database: 'smart-brain'
  }
});


// console.log(postgres.select('*').from('users'));
// postgres.select('*').from('users').then(console.log);

const saltRounds = 10; // 2^10 = 1024  increase this if you want more iterates
// const password = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

app.use(cors());
app.use(bodyParser.json())


app.get('/', (req,res) => {
  // res.json(database.users)
  // db.select('*').from('users')
  // .then(users => {
  //   res.json(users)
  // })
  // .catch(err => console.log('server crush down...')
  // )
  res.json(database.users)
})

// const database = {
//   users: [
//     {
//       id: '123',
//       name: 'Bowei',
//       email: 'bowei@gmail.com',
//       password: 'yellow',
//       entries: 0,
//       joined: new Date()
//     },
//     {
//       id: '124',
//       name: 'Jessy',
//       email: 'Jessy@gmail.com',
//       password: 'apples',
//       entries: 0,
//       joined: new Date()
//     },
//   ],
//   // login: [
//   //   {
//   //     id: '321',
//   //     has: '',
//   //     email: 'Bowei@gmail.com'
//   //   }
//   // ]
// }

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user (new created)
/profile/:id --> GET = user
/image --> PUT = count
*/

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
// bash way to define a PORT : PORT = 3000 node server.js

// fish way 
app.listen( process.env.PORT ||3000, ()=> {
  console.log(`server is listening on port ${process.env.PORT}...`)
})  

