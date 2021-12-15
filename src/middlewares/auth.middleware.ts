import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import { HttpException } from '../error/HttpException';
import AbstractService from "../services/abstract.service";
import { RequestWithUser } from '../types/auth';
import { IUser } from "../types/users";
import { NOT_FOUND, UNAUTHORIZED_ACCESS } from "../types/status";

export default async (req: RequestWithUser, res: Response, next: NextFunction) => {

  try {
    const Authorization: string = req.cookies['Authorization'] || req.header['Cookie'].split('Bearer ')[1];
    if (Authorization) {
      await jwt.verify(Authorization, process.env.SECRET_KEY || "", async (err, decodedToken) => {
        if (decodedToken) {
          const abstractService = new AbstractService<IUser>();
          const findUser: IUser = await abstractService.findById(decodedToken.id);
          if (findUser) {
            req.user = findUser;
            next();
          } else {
            next(new HttpException(UNAUTHORIZED_ACCESS, 'Wrong authentication token'));
          }
        } else {
          next(new HttpException(NOT_FOUND, 'Authentication token missing'));
        }
      });
    }
  } catch (error) {
    next(new HttpException(UNAUTHORIZED_ACCESS, 'Wrong authentication token'));
  }
};
