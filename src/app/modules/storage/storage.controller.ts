import { Request, Response, NextFunction } from "express";
import { getFile, getFiles, getPreSignedUrlService, parsedImageUrl, saveFileService } from "./storage.service";


export const uploadFile = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const file = req.files;
        if (file.length <= 0) {
            return res.status(400).json({
                status: "error",
                error: "Unable to upload image at this moment"
            })
        }

        const fileIds = await getPreSignedUrlService(req);
        if (fileIds.length <= 0) {
            return res.status(500).json({
                status: "error",
                error: "Unable to upload image at this moment"
            })
        }

        res.status(200).json(fileIds);

    } catch (error: any) {
        // console.log("user update error", error);
        if (error?.response) {
            return res.status(error?.response?.status).json({
                status: "error",
                ...error?.response?.data
            })
        }

        return res.status(500).json({
            status: "error",
            error: error
        })
    }
}

/*
    1. latency 
*/

// Single Image Parser
export const imageParser = async (req: Request | any, res: Response) => {
    try {
        const fileId = req.body.fileId;
        console.log('file id',fileId);
        // console.log(`${req.headers.token}`)
        const fileUrl = await getFile(req, fileId);

        res.status(200).json(fileUrl);
    } catch (error: any) {
        return res.status(500).json({
            status: "error",
            error: error
        })
    }
}


// Multi Image Array parser
export const multiImageParser = async (req: Request | any, res: Response) => {
    try {
        const fileIds = req.body.FileIds;
        const fileUrls = await getFiles(req, fileIds);

        res.status(200).json(fileUrls);
    } catch (error: any) {
        return res.status(500).json({
            status: "error",
            error: error
        })
    }
}