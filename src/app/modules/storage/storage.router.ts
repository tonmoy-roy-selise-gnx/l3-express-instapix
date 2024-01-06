import express from "express";
import { uploadFile, imageParser, multiImageParser } from "./storage.controller";
import multer from "multer";
import path from 'path';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.array('image', 12), uploadFile);

//file id to url parser
router.post('/url/parser', imageParser)

//file ids to url parser
router.post('/urls/parser', multiImageParser)

export default router;