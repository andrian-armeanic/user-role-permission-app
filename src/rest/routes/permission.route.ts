import { Router } from "express";
import PermissionController from "@/rest/controllers/permission.controller";

export default class PermissionRoute {

  public router = Router();
  public permissionController = new PermissionController();

  constructor() {

    this.router.get(`/permissions/`, this.permissionController.getPermissions);
    this.router.get(`/permissions/:id`, this.permissionController.getPermissionById);
    this.router.post(`/permissions/`, this.permissionController.createPermission);
    this.router.put(`/permissions/:id`, this.permissionController.updatePermission);
    this.router.delete(`/permissions/:id`, this.permissionController.deletePermission);
  }
}
