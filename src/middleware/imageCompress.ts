import sharp from "sharp";
import { NextFunction, Response, Request } from "express";

// {
//     fieldname: 'image',
//     originalname: 'cover.jpg',
//     encoding: '7bit',
//     mimetype: 'image/jpeg',
//     buffer: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 01 00 48 00 48 00 00 ff e2 0c 58 49 43 43 5f 50 52 4f 46 49 
//   4c 45 00 01 01 00 00 0c 48 4c 69 6e 6f 02 10 00 00 ... 1146263 more bytes>,
//     size: 1146313
//   }

export const imageCompressionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            return res.status(400).send({
                status: "error",
                error: 'No files provided'
            });
        }

        // Process each file in the provided array
        const data = await Promise.all(
            req.files.map(async (file: any) => {
                if (file.size > 10000) {
                    const compressedImageBuffer = await sharp(file.buffer)
                        // .resize({ width: 500 }) // Set the width (you can adjust as needed)
                        .toFormat('jpeg') // Convert the image to JPEG format
                        .webp({ quality: 4 }) // Set the JPEG quality (0-100)
                        .toBuffer(); // Get the compressed image as a buffer

                    const metadata = await sharp(compressedImageBuffer).metadata();
                    // console.log(metadata);

                    return { ...file, size: metadata.size, buffer: compressedImageBuffer }
                }

                if (file.size > 4000) {
                    const compressedImageBuffer = await sharp(file.buffer)
                        // .resize({ width: 500 }) // Set the width (you can adjust as needed)
                        .toFormat('jpeg') // Convert the image to JPEG format
                        .webp({ quality: 20 }) // Set the JPEG quality (0-100)
                        .toBuffer(); // Get the compressed image as a buffer

                    const metadata = await sharp(compressedImageBuffer).metadata();
                    return { ...file, size: metadata.size, buffer: compressedImageBuffer }
                }

                // console.log(file);
                return file;
            })
        );

        // console.log(data);
        req.files = data;

        next();
    } catch (error) {
        // console.error(error);
        res.status(500).send({
            status: "error",
            error: 'Error during image compression'
        });
    }
};