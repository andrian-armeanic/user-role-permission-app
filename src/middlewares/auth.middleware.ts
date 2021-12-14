import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import StatusCodes from "../types/statusCode";

import { HttpException } from '../error/HttpException';
import AbstractService from "../services/abstract.service";
import { DataStoredInToken, RequestWithUser } from '../types/auth';
import { IUser } from "../types/users";

export default async (req: RequestWithUser, res: Response, next: NextFunction) => {

  try {
    const Authorization: string = req.cookies['Authorization']
      || (<string>req.header('Cookie')).split('Bearer ')[1]
      || null;
    if (Authorization) {
      const userToken = await jwt.verify(Authorization, <string>process.env.SECRET_KEY) as DataStoredInToken;
      const abstractService = new AbstractService<IUser>();
      const findUser: IUser = await abstractService.findById(userToken._id);
      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(StatusCodes.UNAUTHORIZED, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(StatusCodes.NOT_FOUND, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(StatusCodes.UNAUTHORIZED, 'Wrong authentication token'));
  }
};
