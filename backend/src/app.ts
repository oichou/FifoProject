import createError from 'http-errors';
import path from 'path';
import bodyParser from 'body-parser';
import apiRouter from './routes/api';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import express from 'express';
import cors from 'cors';

var app = express();
app.use(cors());
const port = process.env.PORT || 9000;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
