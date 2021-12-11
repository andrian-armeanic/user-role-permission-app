import { Types } from "mongoose";
import { IPermission } from './permission';

export interface IRole {

  _id: Types.ObjectId | string;
  name: string;
  permissionIds: Types.ObjectId[] | string[];
}

export interface IRoleExt extends IRole {

  permissions?: IPermission[];
}