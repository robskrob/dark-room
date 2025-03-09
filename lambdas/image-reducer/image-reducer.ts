import { Handler } from 'aws-lambda';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({});

export const handler: Handler = async (event, context) => {
  console.log('EVENT: \n' + JSON.stringify(event, null, 2));
  const p1 = JSON.parse(event["Records"][0]["body"])
  console.log(Object.keys(p1));
  const p2 = JSON.parse(p1["Message"]);
  console.log(p2);
  console.log(p2["Records"][0]["s3"]);

  const imageObj = p2["Records"][0]["s3"];
  console.log("name: ", imageObj.bucket.name)
  console.log("key: ", imageObj.object.key)

  const client = new S3Client({});

  try {
    const response = await client.send(
      new GetObjectCommand({
        Bucket: imageObj.bucket.name,
        Key: imageObj.object.key,
      }),
    );
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    const str = await response.Body.transformToString();
    console.log(str);
  } catch (caught) {
    console.log("caught error", caught)
    throw caught;
    // if (caught instanceof NoSuchKey) {
    //   console.error(
    //     `Error from S3 while getting object "${key}" from "${bucketName}". No such key exists.`,
    //   );
    // } else if (caught instanceof S3ServiceException) {
    //   console.error(
    //     `Error from S3 while getting object from ${bucketName}.  ${caught.name}: ${caught.message}`,
    //   );
    // } else {
    //   throw caught;
    // }
  }
  
  return context.logStreamName;
};
