import { authentication } from '../../../middleware/authentication.middleware';
import { createInstaUser, useIAMController, getSuggestions, followUser, loggedInUser } from './user.controllet';
import express from "express";
const router = express.Router();

router.post('/auth', useIAMController);
router.get('/auth/loggedin/user', authentication, loggedInUser);
// router.get('/shops', shopsData);
router.post('/new/user', createInstaUser)
//loggedin user will get the follow suggestion if he doesn't follow them
router.get('/suggestions', getSuggestions)
//follow a user
router.post('/follow', followUser);

export default router;