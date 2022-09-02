require('dotenv').config();

require('./config');

const express = require('express');

module.exports = async function createApp() {
    const app = express();

    return app;
}