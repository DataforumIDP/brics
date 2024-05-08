const {AWS_HOST, AWS_ACCESS, AWS_SECRET} = process.env
import { S3 } from 'aws-sdk'

const AWS_config = {
    endpoint: AWS_HOST,
    accessKeyId: AWS_ACCESS,
    secretAccessKey: AWS_SECRET
}

export const s3 = new S3(AWS_config)