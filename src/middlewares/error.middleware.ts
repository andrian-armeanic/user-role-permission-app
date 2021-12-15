import { NextFunction, Request, Response } from 'express';
import { HttpException } from "../error/HttpException";
import { INTERNAL_SERVER_ERROR } from "../types/status";

export default (error: HttpException, req: Request, res: Response, next: NextFunction) => {

  try {
    res.status(error.status || INTERNAL_SERVER_ERROR)
      .json({ message: error.message || 'Something went wrong' });
  } catch (error) {
    next(error);
  }
};
