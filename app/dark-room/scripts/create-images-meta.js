import path from "path";
import fs from "fs";
import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({});

const fetchAllKeys = async (params) => {

  const response = await client.send(new ListObjectsV2Command(params));

  if (response.IsTruncated) {

    return response.Contents.concat(
      await fetchAllKeys({
        ...params,
        ContinuationToken: response.NextContinuationToken
      })
    );
  } else {
    return response.Contents
  }
}

(async () => {

  try {
    const contents = await fetchAllKeys({
      Bucket: "dr-reduced-images"
    })

    console.log("file count: ", contents.length)

    const list = []
    for (const index in contents) {
      const asset = contents[index];

      list.push({alt: `image ${index + 1}`, path: asset.Key, css: []})
    }

    const absolutePath = path.resolve( '../out/meta-images.json' );

    await fs.writeFileSync(absolutePath, JSON.stringify(list));

  } catch (err) {
    console.error(err);
  }
})();
