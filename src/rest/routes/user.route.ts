import { Router } from 'express';
import UserController from "@/rest/controllers/user.controller";

export default class UserRoute {

  public router = Router();
  public userController = new UserController();

  constructor() {

    this.router.get(`/users/`, this.userController.getUsers);
    this.router.get(`/users/:id`, this.userController.getUserById);
    this.router.post(`/users/`, this.userController.createUser);
    this.router.put(`/users/:id`, this.userController.updateUser);
    this.router.delete(`/users/:id`, this.userController.deleteUser);
  }
}
