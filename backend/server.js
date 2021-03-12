const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

const atlas_uri = process.env.ATLAS_URI;

mongoose.connect(atlas_uri, {
    useNewUrlParser : true
    , useCreateIndex : true
    , useUnifiedTopology : true
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB connected.');
});



// Add routers here
const authenticator = require('./routes/authenticator');
const user = require('./routes/user');

// Use routers
app.use('/api/authenticator', authenticator);
app.use('/api/user', user);

app.get('/', (req, res) => {
    res.json('Hello, world');
});

https.createServer({
        key : fs.readFileSync('./certs/server.key')
        , cert : fs.readFileSync('./certs/server.cert')
}, app)
.listen(port, () => {
    console.log(`Secure app listening on port ${port}`);
});

