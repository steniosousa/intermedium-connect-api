import { PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

interface IUploadS3Provider {
  buffer: Buffer;
  originalName: string;
  mimetype: string;
  size: number;
}

@Injectable()
export class UploadS3Provider {
  async upload(file: IUploadS3Provider) {
    const region = process.env.AWS_REGION ?? 'us-east-2';
    const bucket = 'intermedium-connect';
    const key = `uploads/${Date.now()}-${file.originalName}`;

    const s3 = new S3({
      region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file.buffer,
        ACL: 'public-read',
      }),
    );

    return {
      url: `https://${bucket}.s3.${region}.amazonaws.com/${key}`,
    };
  }
}
