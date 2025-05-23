
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use((req,
         res,
         next) => {
    let auth = req.query['auth'];
    if (auth === 'true')
        next();
    else
        res.status(401).send('Not authorized')
});
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
