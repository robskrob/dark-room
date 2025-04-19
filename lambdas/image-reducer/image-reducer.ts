import { Handler } from 'aws-lambda';
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import sharp from 'sharp'

const s3Client = new S3Client({});

export const handler: Handler = async (event, context) => {
  const p1 = JSON.parse(event["Records"][0]["body"])
  const p2 = JSON.parse(p1["Message"]);

  const imageObj = p2["Records"][0]["s3"];
  const key = imageObj.object.key

  try {

    const client = new S3Client({});
    const response = await client.send(
      new GetObjectCommand({
        Bucket: imageObj.bucket.name,
        Key: key,
      }),
    );

    const imgData = await response.Body.transformToByteArray();
    const reducedBuffer = await sharp(imgData).webp({ quality: 20 }).toBuffer();

    const command = new PutObjectCommand({
      Bucket: "dr-reduced-images",
      ContentType: "image/webp",
      Key: `reduced-${key}`,
      Body: reducedBuffer,
    });

    const uploadResponse = await client.send(command);

  } catch (caught) {
    console.log("caught error", caught)
    throw caught;
  }
  
  return context.logStreamName;
};
