import { NextFunction, Request, Response } from "express";
import PermissionService from "../services/permission.service";
import {IPermission, PermissionDto} from "../types/permission";
import {CREATED, OK} from "../types/status";

export default class PermissionController {

  public permissionService = new PermissionService();

  public getPermissions = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const permissions: PermissionDto[] = await this.permissionService.findAll();
      res.status(OK)
          .json(permissions);
    } catch (error) {
      next(error);
    }
  };

  public getPermissionById = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const permissionId: string = req.params.id;
      const permission: PermissionDto = await this.permissionService.findById(permissionId);
      res.status(OK)
          .json(permission);
    } catch (error) {
      next(error);
    }
  };

  public createPermission = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const permissionData: IPermission = req.body;
      const newPermission: PermissionDto = await this.permissionService.create(permissionData);
      res.status(CREATED)
          .json(newPermission);
    } catch (error) {
      next(error);
    }
  };

  public updatePermission = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const permissionId: string = req.params.id;
      const permissionData: IPermission = req.body;
      const updatedPermission: PermissionDto = await this.permissionService.update(permissionId, permissionData);
      res.status(OK)
          .json(updatedPermission);
    } catch (error) {
      next(error);
    }
  };

  public deletePermission = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const permissionId: string = req.params.id;
      const deletedPermission: PermissionDto = await this.permissionService.delete(permissionId);
      res.status(OK)
          .json(deletedPermission);
    } catch (error) {
      next(error);
    }
  };
}
