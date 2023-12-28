import InstaUser from "../user/user.model";
import InstaPost from "./post.model";
import { IPost } from "./post.model";

export const createPost = async (req: IPost) => {
  try {
    const data = await InstaPost.create({
      userId: req.userId,
      files: req.files,
      content: req.content,
    });
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getAllPosts = async (loggedInUserId: any) => {
  try {

    const loggedInUser = await InstaUser.findOne({
      userId: loggedInUserId,
    });
    if (loggedInUser) {
      const posts = await InstaPost.find({
        $or: [
          { userId: { $in: loggedInUser.following } },
          { userId: loggedInUserId },
        ],
      });
      return posts;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getOwnerPosts = async (userId: any) => {
  try{
    const posts=await InstaPost.find({userId:userId});
    return posts;
  }catch(err){
    console.log(err);
    return err;
  }
}
