import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';
import AuthController from '../controllers/auth.controller';

export default class AuthRoute {

  public router = Router();
  public authController = new AuthController();

  constructor() {

    this.router.post(`/auth/login`, this.authController.logIn);
    this.router.post(`/auth/logout`, authMiddleware, this.authController.logOut);
  }
}
