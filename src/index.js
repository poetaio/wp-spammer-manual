const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./db');
require('dotenv').config();

require('./models/models');

const PUBLIC_PATH = path.resolve(__dirname, '..', 'public');
const VIEWS_PATH = path.resolve(__dirname, 'views');
const PORT = process.env.PORT;


const app = express();

app.set('view engine', 'pug');
app.set('views', VIEWS_PATH);
app.use(express.json());
app.use(cors());
app.use(express.static(PUBLIC_PATH));

app.get('/', (req, res) => {
    res.render('index', {

    });
});

const start = async () => {

    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();
