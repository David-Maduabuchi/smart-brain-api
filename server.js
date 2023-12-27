const express = require("express")
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1', //this is the same thing as home, local host 
    port: 5432,
    user: 'postgres',
    password: 'cookies',
    database: 'smart-brain'
  }
});

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send("success") })

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
})