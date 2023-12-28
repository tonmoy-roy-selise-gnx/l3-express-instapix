import axios from "axios";
import { Request, json } from "express";
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';


interface IMyFile {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number
}

interface IReqData {
    ItemId: string,
    MetaData: object,
    Name: string,
    Tags: string[]
}

// const removeFile =(directoryPath:string) =>{
//     fs.unlink(directoryPath, (err) => {
//         if (err) {

//         }

//         res.status(200).send({
//           message: "File is deleted.",
//         });
//       });
// }


export const getPreSignedUrlService = async (req: Request | any) => {
    try {
        // console.log("1st step working well", req.headers?.authorization);
        const files = req.files; // this is storage file in the application and need to remove after done

        const reqData: IReqData[] = [];
        const fileIds: string[] = [];

        files.map(((item: IMyFile) => {
            const guid = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
            const tempData = {
                ItemId: guid,
                MetaData: {},
                Name: item?.filename,
                Tags: [""]
            }
            fileIds.push(guid);
            reqData.push(tempData);
        }))

        const getUploadRequestUrl = await axios.post("http://misterloo.seliselocal.com/api/storageservice/v22/StorageService/StorageQuery/GetPreSignedUrlsForUpload",
            reqData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Host": "misterloo.seliselocal.com",
                    'Authorization': `${req.headers?.authorization}`,
                    'accept': 'application/json'
                },
            });

        // console.log("getUploadRequestUrl", getUploadRequestUrl);

        const promiseArr: Promise<any>[] = [];

        getUploadRequestUrl.data.map((item: any, index: number) => {
            promiseArr.push(saveFileService(item?.UploadUrl, files[index]));

            fs.unlink(files[index].path, err => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`File ${files[index].filename} deleted successfully!`);
                }
            });
        })

        const uploaded = await Promise.all(promiseArr);

        console.log("everything is ok", fileIds, uploaded);
        return fileIds;

    } catch (error) {
        console.log("error from getPreSignedUrlService", error);
        throw error;
    }
}

export const saveFileService = async (url: string, file: any) => {
    try {
        const imagePath = path.join(__dirname, 'uploads', file.filename); // Replace with your image path
        // const blobData = Buffer.from(imagePath, 'base64');
        const imageBinary = fs.readFileSync(imagePath);

        const response = await axios.put(url, imageBinary, {
            headers: {
                // "Host": "misterloo.seliselocal.com",
                'Content-Type': 'text/plain',
                'X-Ms-Blob-Type': 'BlockBlob'
            },
        });

        // console.log(imagePath, response.data);
        return response.data;
    } catch (error) {
        console.log("error from saveFileService");
        // console.log(error);
        throw error;
    }
}


export const getFile = async (req: Request | any, fileId: string) => {
    try {
        // console.log('token from client', req.headers.authorization)
        const response = await axios.get(`http://microservices.seliselocal.com/api/storageservice/v22/StorageService/StorageQuery/GetFile?FileId=${fileId}`, {
            headers: {
                'Authorization': `${req.headers.token}`
            },
        });
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}


export const getFiles = async (req: Request | any, fileIds: string) => {
    try {
        console.log(req.body)
        console.log('token from client', req.headers.authorization)
        const response = await axios.post(`http://microservices.seliselocal.com/api/storageservice/v22/StorageService/StorageQuery/GetFiles`, {
            headers: {
                'Authorization': `${req.headers.authorization}`,
                "Accept": 'application/json'
            },
            data: JSON.stringify(
                fileIds
            )
        });
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const parsedImageUrl = async (req: Request | any) => {
    try {
        const fileId = req.body.fileId;
        console.log('file id', fileId);
        console.log(`${req.headers.authorization}`)

        if (req.headers.authorization) {
            console.log("working")
            const response = await axios.get(`http://microservices.seliselocal.com/api/storageservice/v22/StorageService/StorageQuery/GetFile?FileId=${fileId}`, {
                headers: {
                    'Authorization': `${req.headers.authorization}`,
                    "Host": "microservices.seliselocal.com",
                    'User-Agent': 'PostmanRuntime/7.26.10',
                    'Accept': '*/*',
                },
            });
            console.log(response)


            return response.data;
        }
        // if(response.status===200){
        //     return response.data;
        // }else{
        //     return 'something happended'
        // }

    } catch (error) {
        // console.log(error);
        throw error;
    }
}




