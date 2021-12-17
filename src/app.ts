import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import { connect, set } from "mongoose";
import morgan from 'morgan';

import errorMiddleware from './middlewares/error.middleware';
import AuthRoute from "./routes/auth.route";
import PermissionRoute from "./routes/permission.route";
import RoleRoute from "./routes/role.route";
import UserRoute from "./routes/user.route";

export default class App {

  public app: express.Application;

  constructor() {

    this.app = express();
    this.connectToDatabase(process.env.NODE_ENV || 'development');
    this.initMiddlewares();
    this.initRoutes();
  }

  private initMiddlewares() {

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

  private initRoutes() {
    this.app.use('/', new AuthRoute().router);
    this.app.use('/', new PermissionRoute().router);
    this.app.use('/', new RoleRoute().router);
    this.app.use('/', new UserRoute().router);
  }
}
