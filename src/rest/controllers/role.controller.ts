import { NextFunction, Request, Response } from "express";
import { RoleDto } from "@dtos/roles.dto";
import RoleService from "@/rest/services/role.service";
import { IRole } from "@/types/role";

export default class RoleController {

  public roleService = new RoleService();

  public getRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roles: IRole[] = await this.roleService.findAllRoles();
      res.status(200).json({ roles });
    } catch (error) {
      next(error);
    }
  };

  public getRoleById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleId: string = req.params.roleId;
      const role: IRole = await this.roleService.findRoleById(roleId);
      res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  };

  public createRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleData: RoleDto = req.body;
      const newRole: IRole = await this.roleService.createRole(roleData);
      res.status(201).json({ newRole });
    } catch (error) {
      next(error);
    }
  };

  public updateRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleId: string = req.params.id;
      const roleData: RoleDto = req.body;
      const updatedRole: IRole = await this.roleService.updateRole(roleId, roleData);
      res.status(200).json({ updatedRole });
    } catch (error) {
      next(error);
    }
  };

  public deleteRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleId: string = req.params.id;
      const deletedRole: IRole = await this.roleService.deleteRole(roleId);
      res.status(200).json({ deletedRole });
    } catch (error) {
      next(error);
    }
  };
}
