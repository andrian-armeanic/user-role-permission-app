import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import { HttpException } from '../error/HttpException';
import AbstractService from "../services/abstract.service";
import { RequestWithUser } from '../types/auth';
import { IUser } from "../types/users";

export default async (req: RequestWithUser, res: Response, next: NextFunction) => {

  try {
    const Authorization: string = req.cookies['Authorization'] || req.header['Cookie'].split('Bearer ')[1];
    if (!Authorization) {
      next(new HttpException(401, 'Wrong authentication token'));
    }
    jwt.verify(Authorization, process.env.SECRET_KEY || "", async (err, decodedToken) => {
      if (!decodedToken) {
        next(new HttpException(404, 'Authentication token missing'));
      }
      const abstractService = new AbstractService<IUser>();
      const findUser: IUser = await abstractService.findById(decodedToken?.id);
      if (!findUser) {
        next(new HttpException(401, 'Wrong authentication token'));
      }
      req.user = findUser;
      next();
    });
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};
