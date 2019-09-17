const express = require("express");
const app = express();
const flash = require('express-flash');
const session = require('express-session');

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))
app.use(flash());
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static( __dirname + '/public/dist/public' ));

require('./server/config/mongoose.js')
require('./server/config/routes')(app)

app.listen(8000, () => console.log("listening on port 8000"));