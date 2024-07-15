const express =  require('express');
const session = require('express-session');
const config = require('./config/default');
const connectMongo = require('connect-mongo');
require('./mongodb/db');
import routes from './routes/index';


const port = 9527;
const app = express();

const MongoStore = connectMongo(session);
app.use(session({
  name: config.session.name,
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  cookie: config.session.cookie,
  store: new MongoStore({
    url: config.url,
  })
}))

routes(app);

app.listen(port, () => {
  console.log('成功监听端口：'+ port);
})
