import { NextFunction, Request, Response } from 'express';

import { Logger } from '@core/utils';
import { HttpException } from '../exceptions';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  const status: number = error.status || 500;
  const message: string = error.message || 'Some thing when wrong';

  Logger.error(`[ERROR] - Status: ${status} - Msg: ${message}`);
//   HerokuLogger.error(`[ERROR] - Status: ${status} - Msg: ${message}`);
  res.status(status).json({ message: message });
};

export default errorMiddleware;