import { Request, Response, NextFunction } from "express";
import { loggedInUserData } from "../app/services/iam.services";

interface IUserData {
  IsSuccess: boolean,
  LogInError: null,
  NextUrl: null,
  Roles: string[],
  UserName: string,
  DisplayName: string,
  UserId: string,
  FirstTimeLogIn: false,
  StatusCode: 0,
  PhoneNumber: string,
  Language: string,
  PersonaEnabled: false,
  LastName: string,
  FirstName: string,
  Email: string,
  ProfileImageUrl: string,
  OrganizationId: null
}

export interface MyRequest extends Request {
  userData?: IUserData
}

export const authentication = async (
  req: MyRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = await loggedInUserData(req);
    if (!userData?.IsSuccess) {
      throw new Error('access_token in invalid');
    };

    req.userData = userData;
    next();
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      error: error,
    });
  }
};
