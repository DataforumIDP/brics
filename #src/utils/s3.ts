import { Request, Response } from "express";
import { s3 } from "../config/s3";
import { S3 } from "aws-sdk";

export async function uploadToS3(
    params: S3.PutObjectRequest
): Promise<false | S3.ManagedUpload.SendData> {
    const result: Promise<false | S3.ManagedUpload.SendData> = new Promise(
        (resolve, reject) => {
            s3.upload(params, (err: Error, data: S3.ManagedUpload.SendData) => {
                if (err) resolve(false);
                resolve(data);
            });
        }
    );

    return await result;
}

export async function getFromS3(params: S3.GetObjectRequest) {
    const result: Promise<false | S3.GetObjectOutput> = new Promise(
        (resolve, reject) => {
            s3.getObject(params, (err: Error, data: S3.GetObjectOutput) => {

                if (err) resolve(false);
                resolve(data);
            });
        }
    );

    return await result;
}

export async function getRangeFromS3(
    req: Request,
    res: Response,
    options: S3.GetObjectRequest
) {
    try {
        const headData = await s3.headObject(options).promise();
        const fileSize = headData.ContentLength??0;
        const contentType = headData.ContentType || "video/mp4";
    
        const range = req.headers.range ?? "";
        const bytesPrefix = "bytes=";
        const parts = range.replace(bytesPrefix, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = end - start + 1;
    
        const stream = s3
            .getObject({
                ...options,
                Range: `bytes=${start}-${end}`,
            })
            .createReadStream();
    
        res.writeHead(206, {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunksize,
            "Content-Type": contentType,
        });
    
        stream.pipe(res);

    } catch {
        res.status(500).json({err: 'Ошибка AWS'})
    }
}
