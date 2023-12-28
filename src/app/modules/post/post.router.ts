import express from "express";
import { createPostByUser,getOwnPosts,getPosts } from './post.controller';
const router = express.Router();

router.post('/new/post',createPostByUser)
router.get('/posts/:loggedInUserId',getPosts)

//users own post will show
router.get('/own/posts/:userId',getOwnPosts)

// router.post('/register-google-user', googleAuthentication, registerByGoogle);
// router.post('/registration-request', registerRequest)
// router.post('/registration-confirm', registerUser)
// router.get('/data', authentication, getUserByToken)
// router.patch('/update', authentication, updateUserByToken);

export default router;