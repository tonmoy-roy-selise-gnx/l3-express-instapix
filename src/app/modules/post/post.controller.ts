import { Request, Response, NextFunction } from "express";
import { createPost, getAllPosts } from "./post.service";

//create post by user
export const createPostByUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const response = await createPost(req.body);
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
export const getPosts=async(req:Request,res:Response)=>{
  try{
    const {loggedInUserId}=req.params;
    const respons=await getAllPosts(loggedInUserId);
    return res.status(200).json({
      status:"success",
      posts:respons
    })

  }catch (error: any) {
    res.status(500).json({
      status: "error",
      error: error,
    });
  }
}
