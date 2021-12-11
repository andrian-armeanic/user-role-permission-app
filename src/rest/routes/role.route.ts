import { Router } from "express";
import RoleController from "@/rest/controllers/role.controller";

export default class RoleRoute {

  public router = Router();
  public roleController = new RoleController();

  constructor() {

    this.router.get(`/roles/`, this.roleController.getRoles);
    this.router.get(`/roles/:id`, this.roleController.getRoleById);
    this.router.post(`/roles/`, this.roleController.createRole);
    this.router.put(`/roles/:id`, this.roleController.updateRole);
    this.router.delete(`/roles/:id`, this.roleController.deleteRole);
  }
}
