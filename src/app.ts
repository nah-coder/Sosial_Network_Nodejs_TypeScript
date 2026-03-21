import express from 'express';
import { Route } from './core/interface';
import mongoose from 'mongoose';


class App{
    public app:express.Application;
    public port: string | number;
    constructor(routes:Route[]) {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.initializeRoutes(routes);
        this.connectToDatabase();
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

    private connectToDatabase() {
        try {
            const connectString = process.env.MONGODB_URI || '';
            if (!connectString) {
                console.log('MONGODB_URI is not defined in the environment variables');
                return;
            }
            mongoose.connect(connectString);
            console.log('Connected to the database');
        } catch (error) {
            console.error('Error connecting to the database:', error);
        }
    }
}

export default App;