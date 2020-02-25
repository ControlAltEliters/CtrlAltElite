var mongoose = require('mongoose');
var passport = require('passport');
var auth = require('./routes/auth');
var category = require('./routes/category');
var post = require('./routes/post');

mongoose.connect('mongodb://localhost/blog-cms', {
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

app.use(passport.initialize());
app.use('/api/auth', auth);
app.use('/api/category', category);
app.use('/api/post', post);