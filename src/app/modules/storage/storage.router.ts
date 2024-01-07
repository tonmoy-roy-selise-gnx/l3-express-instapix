import express from "express";
import multer from "multer";
import { uploadFile, imageParser, multiImageParser } from "./storage.controller";
import { authentication } from './../../../middleware/authentication.middleware';
import { imageCompressor } from './../../../middleware/imageCompress.middleware';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.array('image', 12), imageCompressor, uploadFile);

//file id to url parser
router.post('/url/parser', authentication, imageParser)

//file ids to url parser
router.post('/urls/parser', authentication, multiImageParser)

export default router;