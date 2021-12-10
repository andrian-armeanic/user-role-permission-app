import { Router } from 'express';
import authMiddleware from '@/middlewares/auth.middleware';
import AuthController from '@/rest/controllers/auth.controller';

export default class AuthRoute {

  public path = '/auth/';
  public router = Router();
  public authController = new AuthController();

  constructor() {

    this.router.post(`${this.path}login`, this.authController.logIn);
    this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
  }
}
