import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';

import errorMiddleware from './middlewares/error.middleware';
import { Route } from "./types/routes";
import {connect, set} from "mongoose";

export default class App {

  public app: express.Application;
  public port: string | number;

  constructor(routes: Route[]) {

    this.app = express();
    this.port = process.env.PORT || 3000;
    this.connectToDatabase(process.env.NODE_ENV || 'development');
    this.initializeMiddlewares();
    routes.forEach(route => this.app.use('/', route.router))
  }

  private initializeMiddlewares() {

    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan("dev"));
    }
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser())
    this.app.use(errorMiddleware);
  }

  private connectToDatabase(env: string) {

    if (env !== 'production') {
      set('debug', true);
    }
    connect(<string>process.env.MONGO_URI)
        .then(() => console.log('Database connection established!'))
        .catch((err) => console.log('Database connection issue: ' + err.message));
  }
}
