import { Types } from "mongoose";
import { PermissionDto } from '@/types/permission';

export interface IRole {
  _id: Types.ObjectId | string;
  name: string;
  permissionIds: Types.ObjectId[] | string[];
}

export class RoleDto {
  public _id: Types.ObjectId | string;
  public name: string;
  public permissionIds: Types.ObjectId[] | string[];
  public permissions?: PermissionDto[];
}
