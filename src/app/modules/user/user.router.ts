import { createInstaUser, useIAMController,getSuggestions, followUser, loggedInUser } from './user.controllet';
import express from "express";
const router = express.Router();

router.post('/auth', useIAMController);
router.get('/auth/loggedin/user', loggedInUser);
// router.get('/shops', shopsData);
router.post('/new/user',createInstaUser)
//loggedin user will get the follow suggestion if he doesn't follow them
router.get('/suggestions',getSuggestions)
//follow a user
router.post('/follow',followUser)

// router.post('/register-google-user', googleAuthentication, registerByGoogle);
// router.post('/registration-request', registerRequest)
// router.post('/registration-confirm', registerUser)
// router.get('/data', authentication, getUserByToken)
// router.patch('/update', authentication, updateUserByToken);

export default router;