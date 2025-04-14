import path from "path";
import fs from "fs";
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
    console.log(response.Contents)

    const contents = response.Contents;
    const list = []
    for (const index in contents) {
      const asset = contents[index];
      list.push({alt: `image ${index + 1}`, path: asset.Key})
    }

    // const extname = path.extname( 'meta-images' );
    // const filename = path.basename( 'meta-images', 'json' );
    const absolutePath = path.resolve( '../out/meta-images.json' );

    await fs.writeFileSync(absolutePath, JSON.stringify(list));

  } catch (err) {
    console.error(err);
  }
})();
