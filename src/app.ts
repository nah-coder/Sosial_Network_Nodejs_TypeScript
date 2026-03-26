import express from 'express';
import { Route } from '@core/interface';
import mongoose from 'mongoose';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { Logger } from '@core/utils';
import { error } from 'winston';
import { errorMiddleware } from '@core/interface/middleware';


class App{
    public app:express.Application;
    public port: string | number;
    public production: boolean;
    constructor(routes:Route[]) {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.production = process.env.NODE_ENV === 'production'? true : false;
        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
    }

    private initializeRoutes(routes:Route[]) {
        routes.forEach(route => {
            this.app.use(route.path, route.router);
        }   
    )};

    public listen() {
        this.app.listen(this.port, () => {
            Logger.info(`App is listening on the port ${this.port}`);
        });
    }

    private connectToDatabase() {
        const connectString = process.env.MONGODB_URI || '';
        if (!connectString) {
            Logger.info('MONGODB_URI is not defined in the environment variables');
            return;
        }
        mongoose.connect(connectString).catch((error) => {
            Logger.error('Failed to connect to the database', error);
        });
        Logger.info('Connected to the database');
    }

    private initializeMiddlewares() {
        if(this.production) {
            this.app.use(hpp());
            this.app.use(helmet());
            this.app.use(cors({origin: 'http://localhost:3000', credentials: true}));
            this.app.use(morgan('combined'));
        }else {
            this.app.use(morgan('dev'));
            this.app.use(cors({origin: true, credentials: true}));
        }
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(errorMiddleware);
    }
}

export default App;