const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose =  require('mongoose');
const config = require('./config/database');
const users = require('./routes/user');
const huts = require('./routes/huts');


mongoose.connect(config.database);
mongoose.connection.on('connected', ()=>{
    console.log('connected to database'+ config.database);
});
mongoose.connection.on('error', (err)=>{
    console.log('Database error'+ err);
});

const app = express();

// const users = require('./routes/user');

// const users = require('./routes/huts');

const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
app.use('/users', users);
app.use('/hut', huts);

app.get('/', (req,res) => {
    res.send('invalid');
});

app.get('*', (req,res)=>{
res.sendFile(__dirname, path.join('public/index.html'));
});

app.listen(port, ()=>{
    console.log('server started on port' + port);
});