const express = require('express');
const app = express();
const http = require('http');
const fs = require('fs')
const mongoose = require('mongoose');

const bodyparser = require('body-parser');
const routeHandler = require('./app/handlers/routeHandler');

const routePath = './app/routes';
const modelPath = './app/models';

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    next();
});

fs.readdirSync(modelPath).forEach(file => {
    if (~file.indexOf('.js')) {
        require(modelPath + '/' + file);
        console.log(modelPath, file)
    }
})

fs.readdirSync(routePath).forEach(file => {
    if (~file.indexOf('.js')) {
        let route = require(routePath + '/' + file);
        route.setRouter(app);
    }
})

app.use(routeHandler.routeNotFoundHandler);

const server = http.createServer(app);
server.listen(3000);
server.on('error', () => console.log('error while creating server'));
server.on('listening', () => {
    console.log('server is up and running');
    mongoose.connect(`mongodb://127.0.0.1:27017/usmdb`, { useNewUrlParser: true, useUnifiedTopology: true });
});

mongoose.connection.on('error', (err) => {
    console.log('error in connecting to db')
})

mongoose.connection.on('open', (err) => {
    if (err)
        console.log('error while connecting to db')
    else
        console.log('database connected successfully');
})

module.exports = app;
