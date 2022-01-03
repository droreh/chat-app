
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
const port = 3001

app.use(cors());
app.use(bodyParser.json());
app.use(express.json())

const registerRoute = require('./register');
app.use('/register', registerRoute)

const mongoose = require('mongoose');
const dbuser = "chat_project";
const dbpass = "123coolmember";
const dbname = "coolmember";
const uri = `mongodb+srv://${dbuser}:${dbpass}@cluster0.oglvs.mongodb.net/${dbname}?retryWrites=true&w=majority`;
//const uri = 'mongodb://127.0.0.1:27017/test'
mongoose.connect(
  uri,
  //{ useNewUrlParser: true }, //same as the youtube tutorial, what is it?
  () => console.log('connected to DB')
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
