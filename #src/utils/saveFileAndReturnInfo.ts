import { UploadedFile } from "express-fileupload";
import * as fs from "async-file";
import { generateChar } from "./generateChar";
import { uploadToS3 } from "./s3";
import { dbQuery } from "../models/dbModel";

export async function saveFileAndReturnInfo(
    file: UploadedFile,
    index: number
): Promise<[{ url: string; name: string }, null] | [null, any]> {
    // Ваша логика обработки каждого файла
    const type = file.name.split(".")[file.name.split(".").length - 1];
    const genName = generateChar(35) + "." + type;
    const filePath = global.uploadDir + "/" + genName;
    await fs.writeFile(filePath, file.data);

    let timestamp = new Date().getTime();

    const params = {
        Bucket: "brics.media",
        Key: `${genName}`,
        Body: file.data,
    };

    const s3Data = await uploadToS3(params);
    if (!s3Data) return [null, "Err S3"];
    

    const [result, err] = await dbQuery(
        `/* SQL */ INSERT INTO files (name, url, timestamp) VALUES ($1, $2, $3) RETURNING *`,
        [file.name, genName, timestamp]
    );

    return result === null ? [null, err] : [result.rows[0], null];
}
