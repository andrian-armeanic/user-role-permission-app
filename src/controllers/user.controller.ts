import { NextFunction, Request, Response } from 'express';
import UserService from "../services/user.service";
import {IUser, UserDto} from '../types/users';
import StatusCodes from "../types/statusCode";

export default class UserController {

  public userService = new UserService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const users: UserDto[] = await this.userService.findAll<IUser>();
      res.status(StatusCodes.OK)
          .json(users);
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const user: UserDto = await this.userService.findById<IUser>(req.params.id);
      res.status(StatusCodes.OK)
          .json(user);
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const userData: IUser = req.body;
      const newUser: UserDto = await this.userService.create<IUser>(userData);
      res.status(StatusCodes.CREATED)
          .json(newUser);
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const userId: string = req.params.id;
      const userData: IUser = req.body;
      const updatedUser: UserDto = await this.userService.update<IUser>(userId, userData);
      res.status(StatusCodes.OK)
          .json(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const userId: string = req.params.id;
      const deletedUser: UserDto = await this.userService.delete<IUser>(userId);
      res.status(StatusCodes.OK)
          .json(deletedUser);
    } catch (error) {
      next(error);
    }
  };
}
