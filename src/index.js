require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./db');
const errorHandler = require('./middleware/errorHandlingMiddleware');
const apiRouter = require('./routers/api-routers/index');
const frontRouter = require('./routers/front-routers/index');

require('./models/models');

const PUBLIC_PATH = path.resolve(__dirname, '..', 'public');
const VIEWS_PATH = path.resolve(__dirname, 'views');
const PORT = process.env.PORT || 8883;

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(PUBLIC_PATH));

app.use('/api', apiRouter);
app.use('/', frontRouter);

app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`App is listening on port ${PORT}, visit: http://localhost:${PORT}/`));
    } catch (e) {
        console.log(e);
    }
}

start();
