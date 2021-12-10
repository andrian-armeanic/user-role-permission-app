import { Types } from "mongoose";

export interface IPermission {

  _id: Types.ObjectId | string;
  name: string;
}
