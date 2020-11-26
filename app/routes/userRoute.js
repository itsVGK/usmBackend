const express = require('express');
const router = express.Router();

const userCtrl = require('./../controller/userController');

module.exports.setRouter = (app) => {
    let baseUrl = '/api/v1';

    app.post(`${baseUrl}/login`, userCtrl.loginController);

    app.post(`${baseUrl}/register`, userCtrl.registerUserCtrl);

    app.post(`${baseUrl}/fetchReport`, userCtrl.fetchData);

    app.post(`${baseUrl}/deleteUser`, userCtrl.deleteUser);
}