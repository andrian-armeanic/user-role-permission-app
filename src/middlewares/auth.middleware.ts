import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import { HttpException } from '@/error/HttpException';
import AbstractService from "@/rest/services/abstract.service";
import { DataStoredInToken, RequestWithUser } from '@/types/auth';
import { IUser } from "@/types/users";

export default async (req: RequestWithUser, res: Response, next: NextFunction) => {

  try {
    const Authorization: string = req.cookies['Authorization']
      || req.header('Authorization').split('Bearer ')[1]
      || null;
    if (Authorization) {
      const userToken = await jwt.verify(Authorization, process.env.SECRET_KEY) as DataStoredInToken;
      const abstractService = new AbstractService<IUser>();
      const findUser: IUser = await abstractService.findById(userToken._id);
      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};
