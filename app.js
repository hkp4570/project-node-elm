const express =  require('express');
import routes from './routes/index';

const port = 9527;
const app = express();

routes(app);

app.listen(port, () => {
  console.log('成功监听端口：'+ port);
})
