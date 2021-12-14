import AbstractService from "./abstract.service";
import roleModel from "../models/roles.model";
import { IRole } from "../types/role";

export default class RoleService extends AbstractService<IRole> {

  constructor() {
    super();
    this.model = roleModel;
  }
}
