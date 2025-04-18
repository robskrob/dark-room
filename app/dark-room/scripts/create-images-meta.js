import path from "path";
import fs from "fs";
// import { GetObjectTaggingCommand, ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({});

(async () => {
  const command = new ListObjectsV2Command({
    Bucket: "dr-reduced-images",
  });

  try {
    const response = await client.send(command);
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    console.log("truncated: ", response.IsTruncated)
    console.log("file count: ", response.KeyCount)

    const contents = response.Contents;
    const test = path.resolve( '../s3-contents.json' );

    await fs.writeFileSync(test, JSON.stringify(contents));

    const list = []
    for (const index in contents) {
      const asset = contents[index];

      // const command = new GetObjectTaggingCommand({
      //   Bucket: "dr-reduced-images", // required
      //   Key: asset.Key,
      // });
      // const response = await client.send(command);
      // const hide = response.TagSet.find(t => t.Key === 'hide')
      list.push({alt: `image ${index + 1}`, path: asset.Key, css: []})
    }

    const absolutePath = path.resolve( '../out/meta-images.json' );

    await fs.writeFileSync(absolutePath, JSON.stringify(list));

    const testTwo = path.resolve( '../meta-images-test.json' );

    await fs.writeFileSync(testTwo, JSON.stringify(list));

  } catch (err) {
    console.error(err);
  }
})();
