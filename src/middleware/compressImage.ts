import sharp from "sharp";
import fs from 'fs';
import { NextFunction, Response, Request } from "express";
import { IMyFile } from "../app/modules/storage/storage.service";
import path from 'path';

export const imageCompressionMiddleware = async (req: Request | any, res: Response, next: NextFunction) => {

    try {
        // if (!req.files) {
        //     return res.status(400).send('No file uploaded');
        // }

        // const files = req.files as IMyFile[];
        // const desTinationFolder = files[0].originalname.split('.')[0];
        // const destinationPath = `${files[0].destination}\\/${desTinationFolder}`;

        // fs.mkdirSync(`${files[0].destination}\\/${desTinationFolder}`);

        // const promises = files.map(async (item: IMyFile, index: number) => {
        //     try {
        //         await sharp(item.path)
        //             .webp({ quality: 20 })
        //             .toFile(`${destinationPath}\\/${item.originalname.split('.')[0]}.webp`);
        //     } catch (err) {
        //         console.error(err);
        //     }
        // });


        // await Promise.all(promises);

        // // Deleting the original file after conversion
        // // files.map((item: IMyFile, index: number) => {
        // //     fs.unlink(item.path, err => {
        // //         if (err) {
        // //             console.error(err);
        // //         } else {
        // //             console.log(`File ${files[index].filename} deleted successfully!`);
        // //         }
        // //     });
        // // });

        // fs.readdir(destinationPath, (err, files) => {
        //     if (err) {
        //         console.error(err);
        //         return next(err)
        //     }

        //     const fileArr = files.map(file => {
        //         console.log(file);
        //         // path.join(destinationPath, file)

        //         const filePath = path.join(destinationPath, file);
        //         const fileStat = fs.readFile(filePath);
        //         return {
        //             originalname: file,
        //             filename: file,
        //             path: filePath,
        //             size: fileStat.size
        //             // You can add more properties like mimetype, etc., based on your needs
        //         };
        //     })
        // })






        // // files.map((item: IMyFile, index: number) => {
        // //     await sharp(item?.path)
        // //         .webp({ quality: 20 })
        // //         .toFile(`${files[0]?.destination}/${desTinationFolder}/` + `${item.originalname.split('.')[0]}.webp`);


        // //     fs.unlink(files[index].path, err => {
        // //         if (err) {
        // //             console.error(err);
        // //         } else {
        // //             console.log(`File ${files[index].filename} deleted successfully!`);
        // //         }
        // //     });
        // // });

        // next();

        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            return res.status(400).send('No files provided');
        }

        const compressedFiles: IMyFile[] = [];

        // Process each file in the provided array
        await Promise.all(
            req.files.map(async (file: IMyFile) => {
                const imagePath = file.path;

                // Compress the image using sharp
                const compressedImageBuffer = await sharp(imagePath)
                    // .resize({ width: 500 }) // Set the width (you can adjust as needed)
                    .toFormat('jpeg') // Convert the image to JPEG format
                    .jpeg({ quality: 80 }) // Set the JPEG quality (0-100)
                    .toBuffer(); // Get the compressed image as a buffer

                // Create a new file path for the compressed image
                const compressedImagePath = imagePath.replace(/\.\w+$/, '_compressed.jpg');

                // Write the compressed image data to a new file
                // await fs.writeFile(compressedImagePath, compressedImageBuffer);

                const controller = new AbortController();
                const { signal } = controller;
                const data = new Uint8Array(Buffer.from(compressedImageBuffer));
                fs.writeFile(compressedImagePath, data, { signal }, (err) => {
                    // When a request is aborted - the callback is called with an AbortError
                });
                // When the request should be aborted
                controller.abort();


                // Delete the original image file
                // await fs.unlink(imagePath);
                // fs.unlink(imagePath, err => {
                //     if (err) {
                //         console.error(err);
                //     } else {
                //         console.log(`File ${file.filename} deleted successfully!`);
                //     }
                // });

                // Construct a new file information object for the compressed image
                const compressedFile = {
                    originalname: file.originalname,
                    filename: `compressed_${file.filename}`,
                    path: compressedImagePath,
                    size: compressedImageBuffer.length,
                    // Add more properties like mimetype, etc., based on your needs
                };

                compressedFiles.push(compressedFile);
            })
        );

        // Update the request object with the new array of compressed files
        req.files = compressedFiles;

        // console.log(req.files);

        next();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error during image compression and replacement');
    }
};