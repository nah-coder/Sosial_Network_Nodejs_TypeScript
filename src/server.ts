import 'dotenv/config';
import App from './app';
import IndexRoute from './modules/index/index.router';

const routes = [new IndexRoute()];
const app = new App(routes);  

app.listen();