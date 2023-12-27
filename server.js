import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express();
import knex from 'knex';
import bcrypt from 'bcrypt-nodejs'
import fetch from 'node-fetch';


import handleSignin from './controllers/signin.js'
import handleProfile from './controllers/profile.js';
import handleRegister from './controllers/register.js';
import handleImage from './controllers/image.js';

const db = knex({
  client: 'pg',
  connection: {
    host: 'dpg-cm60sbocmk4c73csnq40-a', //this is the same thing as home, local host 
    port: 5432,
    user: 'mydb_feg1_user',
    password: 'Tg0Uc0TBtatGJ89783cowGVG6G8EGsMH',
    database: 'mydb_feg1'
  }
});

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send("success") })

app.post('/signin', (req, res) => { handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { handleProfile(req, res, db) })

app.put('/image', (req, res) => { handleImage(req, res, db) })

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
})