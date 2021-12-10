import AbstractService from "@/rest/services/abstract.service";
import roleModel from "@/models/permissions.model";
import { IPermission } from "@/types/permission";

export default class PermissionService extends AbstractService<IPermission> {

  constructor() {
    super();
    this.model = roleModel;
  }
}
