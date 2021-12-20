import { NextFunction, Request, Response } from "express";

import RoleService from "../services/role.service";
import { IRole, RoleDto } from "../types/role";

export default class RoleController {

  public roleService = new RoleService();

  public getRoles = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const roles: RoleDto[] = await this.roleService.findAll();
      res.status(200)
          .json(roles);
    } catch (error) {
      next(error);
    }
  };

  public getRoleById = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const roleId: string = req.params.roleId;
      const role: RoleDto = await this.roleService.findById(roleId);
      res.status(200)
          .json(role);
    } catch (error) {
      next(error);
    }
  };

  public createRole = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const roleData: IRole = req.body;
      const newRole: RoleDto = await this.roleService.create(roleData);
      res.status(201)
          .json(newRole);
    } catch (error) {
      next(error);
    }
  };

  public updateRole = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const roleId: string = req.params.id;
      const roleData: IRole = req.body;
      const updatedRole: RoleDto = await this.roleService.update(roleId, roleData);
      res.status(200)
          .json(updatedRole);
    } catch (error) {
      next(error);
    }
  };

  public deleteRole = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const roleId: string = req.params.id;
      const deletedRole: RoleDto = await this.roleService.delete(roleId);
      res.status(200)
          .json(deletedRole);
    } catch (error) {
      next(error);
    }
  };
}
