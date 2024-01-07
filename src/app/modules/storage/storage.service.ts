import axios from "axios";
import { IReqData } from "./storage.interface";

const business_url = "http://misterloo.seliselocal.com";

export const getPreSignedUrlService = async (reqData: IReqData[], authorization: string) => {
    try {
        const getUploadRequestUrl = await axios.post(`${business_url}/api/storageservice/v22/StorageService/StorageQuery/GetPreSignedUrlsForUpload`,
            reqData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Host": "misterloo.seliselocal.com",
                    'Authorization': `${authorization}`,
                    'accept': 'application/json'
                },
            }
        );

        return getUploadRequestUrl.data;
    } catch (error) {
        console.log("error throw from **getPreSignedUrlService storage service**");
        throw error;
    }
}

export const saveFileService = async (url: string, file: any) => {
    try {
        const response = await axios.put(url, file.buffer, {
            headers: {
                // "Host": "misterloo.seliselocal.com",
                'Content-Type': 'text/plain',
                'X-Ms-Blob-Type': 'BlockBlob'
            },
        });

        return response.data;
    } catch (error) {
        console.log("error throw from **saveFileService storage service**");
        throw error;
    }
}

export const getFile = async (fileId: string, authorization: string) => {
    try {
        // console.log('token from client', req.headers.authorization)
        const response = await axios.get(`${business_url}/api/storageservice/v22/StorageService/StorageQuery/GetFile?FileId=${fileId}`, {
            headers: {
                'Authorization': `${authorization}`
            },
        });
        return response.data;
    } catch (error) {
        console.log("error throw from **getfile storage service**");
        throw error;
    }
}

export const getFiles = async (fileId: string[], authorization: string) => {
    try {
        const response = await axios.post(`${business_url}/api/storageservice/v22/StorageService/StorageQuery/GetFiles`,
            { data: fileId },
            {
                headers: {
                    'Authorization': `${authorization}`,
                    "Accept": 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log("error throw from **getfiles storage service**");
        throw error;
    }
}