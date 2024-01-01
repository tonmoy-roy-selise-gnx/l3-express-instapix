import { Request, Response, NextFunction } from "express";
import { createPost, getAllPosts, getOwnerPosts, getPost, likingPost } from "./post.service";
import { MyRequest } from "../../../middleware/authentication.middleware";
import { IPost } from "./post.model";

//create post by user
export const createPostByUser = async (
  req: MyRequest,
  res: Response,
) => {
  try {
    if (!req?.userData) {
      throw new Error("Token Not Authentic");
    };

    const reqData: IPost = {
      userId: req.userData.UserId,
      files: req.body.files,
      content: req.body.content,
      userName: req.userData.UserName,
      userEmail: req.userData.Email,
    };

    const response = await createPost(reqData);
    res.status(200).json({
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
export const getPosts = async (req: MyRequest, res: Response) => {
  try {
    if (!req?.userData?.UserId) {
      throw new Error('Token Not Authentic');
    }
    const response = await getAllPosts(req?.userData?.UserId);
    return res.status(200).json({
      status: "success",
      posts: response
    })
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      error: error,
    });
  }
}


//retrive loggedin user own post
export const getOwnPosts = async (req: MyRequest, res: Response) => {

  try {
    if (!req?.userData?.UserId) {
      throw new Error('Token Not Authentic');
    }

    const ownPosts = await getOwnerPosts(req?.userData?.UserId);
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

//get individual post
export const getIndividualPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const post = await getPost(postId);
    return res.status(200).json({
      status: "success",
      post
    })
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      error: error,
    });
  }
}


//like or unlike a post by user
export const likePost = async (req: MyRequest, res: Response) => {
  try {
    const { postId } = req.params;
    if (!req?.userData?.UserId) {
      throw new Error('Token Not Authentic');
    };

    console.log('---------------->', postId, req?.userData?.UserId)
    const like = await likingPost(postId, req?.userData?.UserId);
    return res.status(200).json({
      status: "success",
      like
    })
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      error: error,
    });
  }
}
