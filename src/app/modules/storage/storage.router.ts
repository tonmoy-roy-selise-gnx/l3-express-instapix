import express from "express";
import { uploadFile, imageParser, multiImageParser } from "./storage.controller";
import multer from "multer";
import path from 'path';

const router = express.Router();


// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination folder where the uploaded files will be stored
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: function (req, file, cb) {
        // Set the file name when saving the file
        // cb(null, Date.now() + '-' + file.originalname);
        cb(null, file.originalname);
    }
});

export const upload = multer({ storage: storage });

router.post('/upload', upload.array('image', 12), uploadFile);

//file id to url parser
router.post('/url/parser', imageParser)

//file ids to url parser
router.post('/urls/parser', multiImageParser)

export default router;