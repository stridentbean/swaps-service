const {log} = console;

const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const walnut = require('walnut');

const apiRouter = require('./routers/api');

const isProduction = process.env.NODE_ENV === 'production';
const morganLogLevel = 'dev';
const port = process.env.PORT || process.env.ORION_DEMO_PORT || 9889;

const app = express();

app.use(compression());
app.use(express.static('public'));
app.use(morgan(morganLogLevel));
app.set('view engine', 'pug')

app.get('/', ({path}, res) => res.render('index', {path}));
app.use('/api/v0', apiRouter({log}));
app.get('/refund', ({path}, res) => res.render('refund', {path}));

app.listen(port, () => log(`Server listening on port ${port}.`));

if (!isProduction) {
  walnut.check(require('./package'));
}
