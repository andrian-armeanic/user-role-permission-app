import { NextFunction, Request, Response } from 'express';
import { HttpException } from "@/error/HttpException";

export default (error: HttpException, req: Request, res: Response, next: NextFunction) => {

  try {
    res.status(error.status || 500)
      .json({ message: error.message || 'Something went wrong' });
  } catch (error) {
    next(error);
  }
};
