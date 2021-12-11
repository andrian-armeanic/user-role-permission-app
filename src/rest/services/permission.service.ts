import AbstractService from "./abstract.service";
import roleModel from "../../models/permissions.model";
import { IPermission } from "../../types/permission";

export default class PermissionService<T extends IPermission> extends AbstractService<IPermission> {

  constructor() {
    super();
    this.model = roleModel;
  }
}
