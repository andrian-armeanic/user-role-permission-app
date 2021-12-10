import { Types } from "mongoose";
import { IRoleExt } from "@/types/role";

export interface IUser {

  _id: Types.ObjectId | string;
  email: string;
  password: string;
  roleId:  Types.ObjectId | string;
}

export interface IUserExt {

  _id: Types.ObjectId | string;
  email: string;
  password: string;
  roleId: Types.ObjectId | string;
  role?: IRoleExt;
}
