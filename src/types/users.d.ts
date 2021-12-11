import { Types } from "mongoose";
import { IRoleExt } from "./role";

export interface IUser {

  _id: Types.ObjectId | string;
  email: string;
  password: string;
  roleId:  Types.ObjectId | string;
}

export interface IUserExt extends IUser {

  role?: IRoleExt;
}
