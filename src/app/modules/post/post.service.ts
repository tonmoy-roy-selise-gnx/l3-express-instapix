import InstaUser from "../user/user.model";
import InstaPost from "./post.model";
import { IPost } from "./post.model";

export const createPost = async (reqData: IPost) => {
  try {
    const { userId, files, content } = reqData;
    const data = await InstaPost.create({ userId, files, content });
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

export const getOwnerPosts = async (userName: any) => {
  try {
    const posts = await InstaPost.find({ userName });
    return posts;
  } catch (err) {
    console.log(err);
    return err;
  }
};


export const getPost = async (postId: any) => {
  try {
    const post = await InstaPost.findOne({ _id: postId });
    return post;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const likingPost = async (postId: any, userId: any) => {
  try {
    const post = await InstaPost.findOne({ _id: postId });
    if (post) {
      if (post.likedBy.includes(userId)) {
        const index = post.likedBy.indexOf(userId);
        post.likedBy.splice(index, 1);
        await post.save();
        return post;
      } else {
        post.likedBy.push(userId);
        await post.save();
        return post;
      }
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

