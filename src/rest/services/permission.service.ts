import { Document, model } from "mongoose";

import AbstractService from "@/rest/services/abstract.service";
import permissionSchema from "@/schemas/permissions.schema";
import { IPermissions } from "@/types/permission";

export default class PermissionService extends AbstractService<IPermissions> {

  constructor() {
    super();
    this.model = model<IPermissions & Document>('permissions', permissionSchema);
  }
}
