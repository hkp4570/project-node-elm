import v1 from './v1';
import v2 from './v2';
import bos from './bos';
import shopping from './shopping';

export default app => {
  app.use('/v1', v1);
  app.use('/v2', v2);
  app.use('/bos', bos);
  app.use('/shopping', shopping);
}
