import { Request, Response } from "express";
import { IAMService } from "../../services/iam.services";
import { followingUser, individualUserDetails, insertUser, userDetailsUpdate, userSuggestions } from "./user.service";
import { MyRequest } from "../../../middleware/authentication.middleware";

export const useIAMController = async (req: Request, res: Response) => {
  try {
    const response = await IAMService(req);

    let maxTime = response.data.expires_in * 1000; // 7 * 60 * 1000
    let maxDate = 7 * 24 * 60 * 60 * 1000;

    res.cookie("token", response.data.access_token, {
      maxAge: maxTime,
      httpOnly: true,
      secure: true,
    });

    res.cookie("refresh_token", response.data.refresh_token, {
      maxAge: maxDate,
      httpOnly: true,
      secure: true,
    });
    res.status(response.status).json(response.data);
  } catch (error: any) {
    console.log("error throw from **useIAMController user controller**");
    if (error.response) {

      return res.status(error?.response?.status).json({
        status: "error",
        ...error?.response?.data,
      });
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);

      return res.status(error?.response?.status).json({
        status: "error",
        ...error?.response?.data,
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
      // console.log(error.config);

      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  }
};

// creating insta user after registration
export const createInstaUser = async (
  req: Request,
  res: Response
) => {
  try {
    const userData = await insertUser(req.body);

    res.status(200).json({
      status: "success",
      data: userData,
    });
  } catch (error) {
    console.log("error throw from **createInstaUser user controller**");
    return res.status(500).json({ error });
  }
};

//get loggedIn user data from microservice
export const loggedInUser = async (req: MyRequest, res: Response) => {
  try {
    res.status(200).json(req?.userData);
  } catch (error) {
    console.log("error throw from **loggedInUser user controller**");
    return res.status(500).json({ error });
  }
};

//get follow suggestions for a user who is logged in and give suggestion if he is not yet following the user
export const getSuggestions = async (req: MyRequest, res: Response) => {
  try {
    // const { loggedInUser } = req.query;
    if (!req?.userData) {
      throw new Error('user id not found ')
    }

    const suggestions = await userSuggestions(req?.userData.UserId);

    return res.status(200).json({ success: true, suggestions });

  } catch (error) {
    console.log("error throw from **getSuggestions user controller**");
    return res.status(500).json({ error });
  }
};

//make a user follow another user
export const followUser = async (req: Request, res: Response) => {
  try {
    const { loggedInUser, userToFollow } = req.body;

    const user = await followingUser(loggedInUser, userToFollow);

    return res.status(200).json({ user, success: true });

  } catch (error) {
    console.log("error throw from **followUser user controller**");

    return res.status(500).json({ error });
  }
};

export const userDetails = async (req: Request, res: Response) => {
  try {
    const { userName } = req.params;
    //console.log(userName);
    const details = await individualUserDetails(userName);

    return res.status(200).json({
      status: "success",
      details
    })
  } catch (error: any) {
    console.log("error throw from **userDetails user controller**");

    res.status(500).json({
      status: "error",
      error: error,
    });
  }
}

export const updateUser = async (req: MyRequest, res: Response) => {
  try {

    const user = await userDetailsUpdate(req)
    return res.status(200).json({
      status: "success",
      user
    })
  } catch (error: any) {
    console.log("error throw from **updateUser user controller**");

    res.status(500).json({
      status: "error",
      error: error,
    });
  }
}
