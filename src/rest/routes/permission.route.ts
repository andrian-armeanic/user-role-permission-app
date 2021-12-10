import { Router } from "express";
import PermissionController from "@/rest/controllers/permission.controller";

export default class PermissionRoute {

  public path = '/permissions/';
  public router = Router();
  public permissionController = new PermissionController();

  constructor() {

    this.router.get(`${this.path}`, this.permissionController.getPermissions);
    this.router.get(`${this.path}:id`, this.permissionController.getPermissionById);
    this.router.post(`${this.path}`, this.permissionController.createPermission);
    this.router.put(`${this.path}:id`, this.permissionController.updatePermission);
    this.router.delete(`${this.path}:id`, this.permissionController.deletePermission);
  }
}
