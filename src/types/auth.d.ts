import { Request } from 'express';
import { IUser } from './users';

export interface RequestWithUser extends Request {

  user?: IUser;
}
