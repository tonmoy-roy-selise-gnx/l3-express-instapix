import { Request, Response, NextFunction } from "express";

export const validate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        error: "Email and password required",
      });
    }

    next();
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      error: error,
    });
  }
};
