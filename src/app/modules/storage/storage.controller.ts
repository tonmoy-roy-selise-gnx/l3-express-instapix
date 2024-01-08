import { Request, Response, NextFunction } from "express";
import { getFile, getFiles, getPreSignedUrlService, saveFileService } from "./storage.service";
import { IReqData } from "./storage.interface";
import { v4 as uuidv4 } from 'uuid';

export const uploadFile = async (req: Request | any, res: Response, next: NextFunction) => {
    try {

        const files = req.files as Express.Multer.File[]; // this is storage file in the application and need to remove after done

        const reqData: IReqData[] = [];
        const fileIds: string[] = [];

        if (!files) {
            throw new Error("files not found");
        }

        files.map(((item: Express.Multer.File) => {
            const guid = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
            const tempData = {
                ItemId: guid,
                MetaData: {},
                Name: `${guid}.jpeg`,
                Tags: [""]
            }
            fileIds.push(guid);
            reqData.push(tempData);
        }))


        const urlList = await getPreSignedUrlService(reqData, req.headers?.authorization);

        const uploaded = await Promise.all(
            urlList.map(async (item: any, index: number) => {
                await saveFileService(item?.UploadUrl, files[index]);
            })
        );

        res.status(200).json(fileIds);
    } catch (error: any) {
        console.log("error throw from **uploadFile storage controller**");
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

// Single Image Parser
export const imageParser = async (req: Request | any, res: Response) => {
    try {
        const fileUrl = await getFile(req.body.fileId, req.headers?.authorization);
        res.status(200).json(fileUrl);
    } catch (error: any) {
        console.log("error throw from **imageParser storage controller**");
        return res.status(500).json({
            status: "error",
            error: error
        })
    }
}

// Multi Image Array parser
export const multiImageParser = async (req: Request | any, res: Response) => {
    try {
        // const fileIds = req.body.FileIds;
        const fileUrls = await getFiles(req.body.FileIds, req.headers?.authorization);

        res.status(200).json(fileUrls);
    } catch (error: any) {
        console.log("error throw from **multiImageParser storage controller**");
        return res.status(500).json({
            status: "error",
            error: error
        })
    }
}