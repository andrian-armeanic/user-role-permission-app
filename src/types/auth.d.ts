import { Request } from 'express';
import { IUser } from '@/types/users';

export interface DataStoredInToken {

  _id: string;
}

export interface RequestWithUser extends Request {

  user: IUser;
}
