import { NextFunction, Request, Response } from 'express';
import { IUser } from '@/types/users';
import UserService from "@/rest/services/user.service";

export default class UserController {

  public userService = new UserService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const users: IUser[] = await this.userService.findAll<IUser>();
      res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const user: IUser = await this.userService.findById<IUser>(req.params.id);
      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const userData: IUser = req.body;
      const newUser: IUser = await this.userService.create(userData);
      res.status(201).json({ newUser });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const userId: string = req.params.id;
      const userData: IUser = req.body;
      const updatedUser: IUser = await this.userService.update(userId, userData);
      res.status(200).json({ updatedUser });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const userId: string = req.params.id;
      const deletedUser: IUser = await this.userService.delete<IUser>(userId);
      res.status(200).json({ deletedUser });
    } catch (error) {
      next(error);
    }
  };
}
