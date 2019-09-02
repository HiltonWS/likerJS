const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
//Criar um arquivo config.json com o caminho da conexão (dev -> connectionUrl)
const config = fs.readFileSync(path.resolve(__dirname, 'config.json'));
const configJson = JSON.parse(config);

mongoose.connect(configJson.dev.connectionUrl, {
    useNewUrlParser: true,
});

app.use((req, res, next) =>{
    req.io = io;

    next();
});

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

server.listen(3333);