import { NextFunction, Request, Response } from "express";
import PermissionService from "@/rest/services/permission.service";
import { IPermissions } from "@/types/permission";

export default class PermissionController {

  public permissionService = new PermissionService();

  public getPermissions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const permissions: IPermissions[] = await this.permissionService.findAll<IPermissions>();
      res.status(200).json({ permissions });
    } catch (error) {
      next(error);
    }
  };

  public getPermissionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const permissionId: string = req.params.id;
      const permission: IPermissions = await this.permissionService.findById<IPermissions>(permissionId);
      res.status(200).json({ permission });
    } catch (error) {
      next(error);
    }
  };

  public createPermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const permissionData: IPermissions = req.body;
      const newPermission: IPermissions = await this.permissionService.create<IPermissions>(permissionData);
      res.status(201).json({ newPermission });
    } catch (error) {
      next(error);
    }
  };

  public updatePermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const permissionId: string = req.params.id;
      const permissionData: IPermissions = req.body;
      const updatedPermission: IPermissions = await this.permissionService.update<IPermissions>(permissionId, permissionData);
      res.status(200).json({ updatedPermission });
    } catch (error) {
      next(error);
    }
  };

  public deletePermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const permissionId: string = req.params.id;
      const deletedPermission: IPermissions = await this.permissionService.delete<IPermissions>(permissionId);
      res.status(200).json({ deletedPermission });
    } catch (error) {
      next(error);
    }
  };
}
