import app from './app';
import 'reflect-metadata';
import './database';


app.listen(process.env.PORT || 3000, () => {
  console.log('🏃 Running Server');
});
