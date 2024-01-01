import InstaUser from "../user/user.model";
import InstaPost from "./post.model";
import { IPost } from "./post.model";

export const createPost = async (req: IPost) => {
  try {
    const data = await InstaPost.create({
      userId: req.userId,
      files: req.files,
      content: req.content,
      userName: req.userName,
      userEmail: req.userEmail,
    });
    return data;
  } catch (err) {
    // console.log(err);
    throw err;
  }
};

export const getAllPosts = async (userId: string) => {
  try {
    const loggedInUser = await InstaUser.findOne({
      userId: userId,
    });
    if (loggedInUser) {
      const posts = await InstaPost.find({
        $or: [
          { userId: { $in: loggedInUser.following } },
          { userId: userId },
        ],
      })
        .sort({ createdAt: -1 }) // Sorting by createdAt field in descending order
        .exec();
      return posts;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getOwnerPosts = async (userId: string) => {
  try {
    const posts = await InstaPost.find({
      userId: userId,
    });
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
    if (post?.likedBy) {
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
