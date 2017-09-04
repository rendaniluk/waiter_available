const express = require('express');
const app = express();
const exphbs = require('express3-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const WaiterRoutes = require('./appController');

// const mongoURL = process.env.MONGO_DB_URL || 'mongodb://localhost/waiter_avialableDB';


// const Models = require('./models');

// const models = Models(mongoURL);

const waiterRoutes = WaiterRoutes();

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
app.get('/waiters', waiterRoutes.index);
app.get('/waiters/:username', waiterRoutes.waiterScreen);
app.post('/waiters/:username', waiterRoutes.waiterScreen);

// app.get('/admin', waiterRoutes.admin);
// app.get('/login', waiterRoutes.login);
// app.get('/signup', waiterRoutes.signup);
// app.get('/profile', waiterRoutes.profile);

//post routes
// app.post('/')


app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
