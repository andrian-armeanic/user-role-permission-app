import { NextFunction, Request, Response } from "express";
import RoleService from "../services/role.service";
import {IRole, RoleDto} from "../types/role";
import StatusCodes from "../types/statusCode";

export default class RoleController {

  public roleService = new RoleService();

  public getRoles = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const roles: RoleDto[] = await this.roleService.findAll<IRole>();
      res.status(StatusCodes.OK)
          .json(roles);
    } catch (error) {
      next(error);
    }
  };

  public getRoleById = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const roleId: string = req.params.roleId;
      const role: RoleDto = await this.roleService.findById<IRole>(roleId);
      res.status(StatusCodes.OK)
          .json(role);
    } catch (error) {
      next(error);
    }
  };

  public createRole = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const roleData: IRole = req.body;
      const newRole: RoleDto = await this.roleService.create<IRole>(roleData);
      res.status(StatusCodes.CREATED)
          .json(newRole);
    } catch (error) {
      next(error);
    }
  };

  public updateRole = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const roleId: string = req.params.id;
      const roleData: IRole = req.body;
      const updatedRole: RoleDto = await this.roleService.update<IRole>(roleId, roleData);
      res.status(StatusCodes.OK)
          .json(updatedRole);
    } catch (error) {
      next(error);
    }
  };

  public deleteRole = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const roleId: string = req.params.id;
      const deletedRole: RoleDto = await this.roleService.delete<IRole>(roleId);
      res.status(StatusCodes.OK)
          .json(deletedRole);
    } catch (error) {
      next(error);
    }
  };
}
