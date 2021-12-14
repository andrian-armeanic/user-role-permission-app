import { Types } from "mongoose";
import {PermissionDto} from './permission';

export interface IRole {

  _id: Types.ObjectId | string;
  name: string;
  permissionIds: Types.ObjectId[] | string[];
}

export interface RoleDto extends IRole {

  permissions?: PermissionDto[];
}
