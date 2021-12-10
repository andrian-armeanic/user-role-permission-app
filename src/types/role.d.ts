import { Types } from "mongoose";
import { IPermission } from '@/types/permission';

export interface IRole {

  _id: Types.ObjectId | string;
  name: string;
  permissionIds: Types.ObjectId[] | string[];
}

export interface IRoleExt {

  _id: Types.ObjectId | string;
  name: string;
  permissionIds: Types.ObjectId[] | string[];
  permissions?: IPermission[];
}
