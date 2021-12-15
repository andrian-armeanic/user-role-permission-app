import { NextFunction, Request, Response } from 'express';
import UserService from "../services/user.service";
import {IUser, UserDto} from '../types/users';
import {CREATED, OK} from "../types/status";

export default class UserController {

  public userService = new UserService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const users: UserDto[] = await this.userService.findAll();
      res.status(OK)
          .json(users);
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const user: UserDto = await this.userService.findById(req.params.id);
      res.status(OK)
          .json(user);
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const userData: IUser = req.body;
      const newUser: UserDto = await this.userService.create(userData);
      res.status(CREATED)
          .json(newUser);
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const userId: string = req.params.id;
      const userData: IUser = req.body;
      const updatedUser: UserDto = await this.userService.update(userId, userData);
      res.status(OK)
          .json(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const userId: string = req.params.id;
      const deletedUser: UserDto = await this.userService.delete(userId);
      res.status(OK)
          .json(deletedUser);
    } catch (error) {
      next(error);
    }
  };
}
