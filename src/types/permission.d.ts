import { Types } from "mongoose";

export interface IPermissions {
  _id: Types.ObjectId | string;
  name: string;
}


export class PermissionDto {

  public _id: Types.ObjectId | string;
  public name: string;
}
