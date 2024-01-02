import { authentication } from '../../../middleware/authentication.middleware';
import { createInstaUser, useIAMController, getSuggestions, followUser, loggedInUser, userDetails } from './user.controllet';
import express from "express";
const router = express.Router();

router.post('/auth', useIAMController);
router.post('/new/user', createInstaUser);

router.use(authentication); // middleware

router.get('/auth/loggedin/user', loggedInUser);
//loggedin user will get the follow suggestion if he doesn't follow them
router.get('/suggestions', getSuggestions)
//follow a user
router.post('/follow', followUser);

//each user details get
router.get('/details/:userName',userDetails)

export default router;