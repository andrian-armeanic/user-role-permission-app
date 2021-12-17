import { Types } from "mongoose";
import { RoleDto } from "./role";

export interface IUser {

  _id: Types.ObjectId | string;
  email: string;
  password: string;
  roleId:  Types.ObjectId | string;
}

export interface UserDto extends IUser {

  role?: RoleDto;
}
