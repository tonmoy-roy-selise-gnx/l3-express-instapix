import express from "express";
import { createPostByUser, deletePost, getIndividualPost, getOwnPosts, getPosts, likePost, updatePost } from './post.controller';
import { authentication } from "../../../middleware/authentication.middleware";
const router = express.Router();

router.use(authentication);
router.post('/create', createPostByUser);
router.get('/feed/all', getPosts);
router.get('/own/all', getOwnPosts);
router.get('/detail/:postId', getIndividualPost);
router.post('/like/:postId', likePost);
router.post('/update/:postId', updatePost);
router.post('/delete/:postId', deletePost)

export default router;