import { Document, model } from "mongoose";

import AbstractService from "@/rest/services/abstract.service";
import roleSchema from "@/schemas/roles.schema";
import { IRole } from "@/types/role";

export default class RoleService extends AbstractService<IRole> {

  constructor() {
    super();
    this.model = model<IRole & Document>('roles', roleSchema);
  }
}
