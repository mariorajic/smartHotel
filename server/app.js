const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');
const glob = require('glob');

const PORT = process.env.PORT || 3002;

const {notFound, errorHandler} = require('./middlewares');

const db = require('./models/index');
const app = express();

//const ensureAuthenticated = require('./middlewares/ensureAuthenticated')(app);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.use('/api', router);
app.set('jwtSecretKey', 'secret key');
app.use(express.static(path.join(__dirname, '../client/dist')));

//Routes
var rootPath = path.normalize(__dirname + '/..');
var controllers = glob.sync(rootPath + '/server/routes/*.js');

controllers.forEach(function (controller) {
    require(controller)(app);
});

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


db.sequelize
    .sync()
    .then(function () {
        app.listen(PORT, function () {
            console.log(`App running on localhost:${PORT}`);
        })
    }).catch(function (e) {
    throw new Error(e);
});

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the eGateSH API'
    });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;