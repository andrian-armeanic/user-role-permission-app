import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException } from '@/tools/error/HttpException';
import { DataStoredInToken, RequestWithUser } from '@/types/auth';
import { IUser } from "@/types/users";
import AbstractService from "@/rest/services/abstract.service";

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || req.header('Authorization').split('Bearer ')[1] || null;
    if (Authorization) {
      const userToken = await jwt.verify(Authorization, process.env.SECRET_KEY) as DataStoredInToken;
      const findUser: IUser = await AbstractService.findById(userToken._id);
      if (findUser) req.user = findUser;
      else next(new HttpException(401, 'Wrong authentication token'));
      next();
    } else next(new HttpException(404, 'Authentication token missing'));
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};
