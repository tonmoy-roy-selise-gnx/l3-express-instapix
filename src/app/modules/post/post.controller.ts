import { Request, Response, NextFunction } from "express";
import { createPost, getAllPosts, getOwnerPosts } from "./post.service";
import { MyRequest } from "../../../middleware/authentication.middleware";

//create post by user
export const createPostByUser = async (
  req: MyRequest,
  res: Response,
) => {
  try {
    if (!req?.userData) {
      throw new Error("user not valid");
    }
    const reqData = { ...req.body, userId: req?.userData.UserId }
    const response = await createPost(reqData);
    return res.status(200).json({
      status: "success",
      post: response,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      error: error,
    });
  }
};

//retrive loggedin user and his follwings post
export const getPosts = async (req: Request, res: Response) => {
  try {
    const { loggedInUserId } = req.params;
    const respons = await getAllPosts(loggedInUserId);
    return res.status(200).json({
      status: "success",
      posts: respons
    })

  } catch (error: any) {
    res.status(500).json({
      status: "error",
      error: error,
    });
  }
}


//retrive loggedin user own post
export const getOwnPosts = async (req: Request, res: Response) => {
  try {
    const ownPosts = await getOwnerPosts(req.params.userId);
    return res.status(200).json({
      status: "success",
      ownPosts
    })
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      error: error,
    });
  }
}
