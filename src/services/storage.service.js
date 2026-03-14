const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

class StorageService {
    constructor() {
        this.s3 = new S3Client({
            region: process.env.S3_REGION || "us-east-1",
            endpoint: process.env.S3_ENDPOINT,
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY,
                secretAccessKey: process.env.S3_SECRET_KEY,
            },
            forcePathStyle: true
        });
    }

    async upload(fileBuffer, key, mimeType) {
        await this.s3.send(new PutObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: key,
            Body: fileBuffer, // ← use buffer directly
            ContentType: mimeType
        }));
        return key;
    }

    getPublicUrl(key) {
        return `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}/${key}`;
    }
}

module.exports = new StorageService();