require('dotenv').config();

const express = require('express');
const loader = require('./loaders');

module.exports = async function createApp() {
    const app = express();
    await loader(app);

    return app;
}