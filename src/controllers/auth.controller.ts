import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { RequestWithUser } from "../types/auth";
import {IUser, UserDto} from "../types/users";
import StatusCodes from "../types/statusCode";

export default class AuthController {

  public authService = new AuthService();

  public logIn = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const userData: IUser = req.body;
      const { userToken, findUser } = await this.authService.login<IUser>(userData);
      res.setHeader('Set-Cookie', 'Authorization=' + userToken)
          .status(StatusCodes.OK)
          .json(findUser as UserDto);
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {

    try {
      const logOutUserData: UserDto = await this.authService.logout<IUser>(req.user);
      res.setHeader('Set-Cookie', 'Authorization=')
          .status(StatusCodes.OK)
          .json(logOutUserData);
    } catch (error) {
      next(error);
    }
  };
}
