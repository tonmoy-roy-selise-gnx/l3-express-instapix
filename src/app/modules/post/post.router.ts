import express from "express";
import { createPostByUser, getOwnPosts, getPosts } from './post.controller';
import { authentication } from "../../../middleware/authentication.middleware";
const router = express.Router();

router.post('/new/post', authentication, createPostByUser);

router.get('/posts/:loggedInUserId', getPosts)

//users own post will show
router.get('/own/posts/:userId', getOwnPosts);

export default router;