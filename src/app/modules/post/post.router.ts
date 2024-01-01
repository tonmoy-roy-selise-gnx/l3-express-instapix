import express from "express";
import { createPostByUser, getIndividualPost, getOwnPosts, getPosts, likePost } from './post.controller';
import { authentication } from "../../../middleware/authentication.middleware";
const router = express.Router();

// router.post('/new/post', authentication, createPostByUser);
// router.get('/posts/:loggedInUserId', authentication, getPosts);

// //users own post will show
// router.get('/own/posts/:userName', getOwnPosts);

// //individual post
// router.get('/post/:postId', getIndividualPost);

// //like or unlike a post by user
// router.post('/like/:postId', likePost);


router.use(authentication);
router.post('/create', createPostByUser);
router.get('/feed/all', getPosts);
router.get('/own/all', getOwnPosts);
router.get('/detail/:postId', getIndividualPost);
router.post('/like/:postId', likePost);

export default router;