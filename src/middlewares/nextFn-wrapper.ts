import { Request, Response, NextFunction } from 'express';
// eslint-disable-next-line @typescript-eslint/ban-types
export default (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
