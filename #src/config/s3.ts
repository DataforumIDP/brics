const {AWS_HOST, AWS_ACCESS, AWS_SECRET} = process.env
import { S3 } from 'aws-sdk'

const AWS_config = {
    endpoint: 'http://s3.storage.selcloud.ru',
    accessKeyId: AWS_ACCESS,
    secretAccessKey: AWS_SECRET
}

export const s3 = new S3(AWS_config)
