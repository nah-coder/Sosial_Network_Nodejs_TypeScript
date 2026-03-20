import express from 'express';
import { Route } from './core/interface';


class App{
    public app:express.Application;
    public port: string | number;
    constructor(routes:Route[]) {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.initializeRoutes(routes);
    }

    private initializeRoutes(routes:Route[]) {
        routes.forEach(route => {
            this.app.use(route.path, route.router);
        }   
    )};

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App is listening on the port ${this.port}`);
        });
    }
}

export default App;