import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';

import connectToDatabase from "@/config/mongodb";
import errorMiddleware from '@/tools/middlewares/error.middleware';

export default class App {

  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: any[]) {

    this.app = express();
    this.port = process.env.PORT || 3000;
    connectToDatabase(process.env.NODE_ENV || 'development');
    this.initializeMiddlewares();
    routes.forEach(route => this.app.use('/', route.router))
  }

  private initializeMiddlewares() {
    this.app.use(morgan("dev"));
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser())
    this.app.use(errorMiddleware);
  }
}
