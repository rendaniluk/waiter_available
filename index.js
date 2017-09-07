const express = require('express');
const app = express();
const exphbs = require('express3-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const WaiterRoutes = require('./appController');

const mongoURL = process.env.MONGO_DB_URL || 'mongodb://localhost/waiter_data';


const Models = require('./models');

const models = Models(mongoURL);

const waiterRoutes = WaiterRoutes(models);

//configuring handlebars
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//using static
app.use(express.static('public'));

//using bodyParser
app.use(bodyParser.urlencoded({
    extended: false
  }))
  // parse application/json
app.use(bodyParser.json());

//configuring session
app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 60000 * 30
  },
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
//get routes
app.get('/', waiterRoutes.index);
app.get('/waiters/:username', waiterRoutes.waiterScreen);
app.post('/waiters/:username', waiterRoutes.waiterdataCapture);
app.get('/days', waiterRoutes.getWaiterData);


app.set('port', (process.env.PORT || 5000));


app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send(err.stack)
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
