import express from "express";
import { createPostByUser,getIndividualPost,getOwnPosts,getPosts, likePost } from './post.controller';
const router = express.Router();

router.post('/new/post',createPostByUser)
router.get('/posts/:loggedInUserId',getPosts)

//users own post will show
router.get('/own/posts/:userName',getOwnPosts)

//individual post
router.get('/post/:postId',getIndividualPost)

//like or unlike a post by user
router.post('/like/:postId',likePost)


// router.post('/register-google-user', googleAuthentication, registerByGoogle);
// router.post('/registration-request', registerRequest)
// router.post('/registration-confirm', registerUser)
// router.get('/data', authentication, getUserByToken)
// router.patch('/update', authentication, updateUserByToken);

export default router;