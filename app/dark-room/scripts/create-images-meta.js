import path from "path";
import fs from "fs";
// import { GetObjectTaggingCommand, ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({});

// const command = new ListObjectsV2Command({
//   Bucket: "dr-reduced-images",
// });

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
