import type { NextFunction, Request, Response } from "express";

export const errorHandler = (
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  switch (true) {
    case typeof err === "string": {
      const is404 = err.toLowerCase().endsWith("not found");
      const statusCode = is404 ? 404 : 400;
      return res.status(statusCode).json({ message: err });
    }
    default:
      return res.status(500).json({ message: err.message });
  }
};
