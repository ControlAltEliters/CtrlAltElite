let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cors= require('cors');
let passport = require('passport');
let mongoose =require('mongoose');
let usersRouter = require('./routes/users');
let indexRouter = require('./routes/index');
let session = require('express-session');

let app = express();

app.use(cors({
  origin:['http://localhost:4200','http://127.0.0.1:4200'],
  credentials:true
}));


// Connect to Mongo Database
// TODO: Remove hardcoded creds later
const mongoUrl = 'mongodb+srv://dbuser:command10@arcadiadb-2u5es.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongoUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: 'test'
})
    .catch(err => console.log('Mongo connection error', err))
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)


//passport
const MongoStore = require('connect-mongo')(session);
app.use(session({
  name:'myname.sid',
  resave:false,
  saveUninitialized:false,
  secret:'secret',
  cookie:{
    maxAge:36000000,
    httpOnly:false,
    secure:false
  },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

require('./passport-config.ts');

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// SERVER START ---------------------------------------------------------------------------

// listen
app.listen(3000, process.env.IP, function (){
  console.log('Server started.  Please visit: 127.0.0.1:3000')
})