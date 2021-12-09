import { Router } from "express";
import RoleController from "@/rest/controllers/role.controller";

export default class RoleRoute {
  public path = '/roles/';
  public router = Router();
  public roleController = new RoleController();

  constructor() {
    this.router.get(`${this.path}`, this.roleController.getRoles);
    this.router.get(`${this.path}:id`, this.roleController.getRoleById);
    this.router.post(`${this.path}`, this.roleController.createRole);
    this.router.put(`${this.path}:id`, this.roleController.updateRole);
    this.router.delete(`${this.path}:id`, this.roleController.deleteRole);
  }
}
