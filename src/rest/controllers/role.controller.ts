import { NextFunction, Request, Response } from "express";
import RoleService from "@/rest/services/role.service";
import { IRole } from "@/types/role";

export default class RoleController {

  public roleService = new RoleService();

  public getRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roles: IRole[] = await this.roleService.findAll<IRole>();
      res.status(200).json({ roles });
    } catch (error) {
      next(error);
    }
  };

  public getRoleById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleId: string = req.params.roleId;
      const role: IRole = await this.roleService.findById<IRole>(roleId);
      res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  };

  public createRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleData: IRole = req.body;
      const newRole: IRole = await this.roleService.create<IRole>(roleData);
      res.status(201).json({ newRole });
    } catch (error) {
      next(error);
    }
  };

  public updateRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleId: string = req.params.id;
      const roleData: IRole = req.body;
      const updatedRole: IRole = await this.roleService.update<IRole>(roleId, roleData);
      res.status(200).json({ updatedRole });
    } catch (error) {
      next(error);
    }
  };

  public deleteRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleId: string = req.params.id;
      const deletedRole: IRole = await this.roleService.delete<IRole>(roleId);
      res.status(200).json({ deletedRole });
    } catch (error) {
      next(error);
    }
  };
}
