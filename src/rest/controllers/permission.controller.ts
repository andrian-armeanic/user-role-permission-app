import { NextFunction, Request, Response } from "express";
import PermissionService from "../services/permission.service";
import { IPermission } from "../../types/permission";

export default class PermissionController {

  public permissionService = new PermissionService();

  public getPermissions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const permissions: IPermission[] = await this.permissionService.findAll<IPermission>();
      res.status(200).json({ permissions });
    } catch (error) {
      next(error);
    }
  };

  public getPermissionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const permissionId: string = req.params.id;
      const permission: IPermission = await this.permissionService.findById<IPermission>(permissionId);
      res.status(200).json({ permission });
    } catch (error) {
      next(error);
    }
  };

  public createPermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const permissionData: IPermission = req.body;
      const newPermission: IPermission = await this.permissionService.create<IPermission>(permissionData);
      res.status(201).json({ newPermission });
    } catch (error) {
      next(error);
    }
  };

  public updatePermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const permissionId: string = req.params.id;
      const permissionData: IPermission = req.body;
      const updatedPermission: IPermission = await this.permissionService.update<IPermission>(permissionId, permissionData);
      res.status(200).json({ updatedPermission });
    } catch (error) {
      next(error);
    }
  };

  public deletePermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const permissionId: string = req.params.id;
      const deletedPermission: IPermission = await this.permissionService.delete<IPermission>(permissionId);
      res.status(200).json({ deletedPermission });
    } catch (error) {
      next(error);
    }
  };
}
