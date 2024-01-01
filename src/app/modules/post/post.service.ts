import axios from "axios";
import InstaUser from "../user/user.model";
import InstaPost from "./post.model";
import { IPost } from "./post.model";
import { MyRequest } from "../../../middleware/authentication.middleware";

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

export const updatingPost = async (req: Request | any) => {
  try {
    const { postId } = req.params;
    const { userId, content } = req.body;
    const post = await InstaPost.findOne({ _id: postId, userId });
    if (post) {
      post.content = content;
      await post.save();
      return post;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}

export const deletingPost = async (req: MyRequest) => {
  try {
    if (!req?.userData?.UserId) {
      throw new Error('Token Not Authentic');
    };


    const post = await InstaPost.findOne({ _id: req.params.postId });
    console.log(post, { _id: req.params.postId, userId: req?.userData?.UserId });

    const getUploadRequestUrl = await axios.post("http://microservices.seliselocal.com/api/storageservice/v22/StorageService/StorageCommand/DeleteAll",
      {
        "ItemIds": post?.files
      },
      {
        headers: {
          'Content-Type': 'application/json',
          "Host": "misterloo.seliselocal.com",
          'Authorization': `${req.headers?.authorization}`,
          'accept': 'application/json'
        },
      });
    // console.log("=================================================================");
    // console.log(getUploadRequestUrl.data);

    const deleted = await InstaPost.deleteOne({ _id: req.params.postId, userId: req?.userData?.UserId });
    return deleted;
    // return "deleted";
  } catch (err) {
    console.log(err);
    return err;
  }
};
