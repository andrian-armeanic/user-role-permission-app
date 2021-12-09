import { Types } from "mongoose";
import { RoleDto } from "@/types/role";

export interface IUser {
  _id: Types.ObjectId | string;
  email: string;
  password: string;
  roleId:  string;
}

export class UserDto {
  public _id: Types.ObjectId | string;
  public email: string;
  public password: string;
  public roleId: Types.ObjectId | string;
  public role?: RoleDto;
}
