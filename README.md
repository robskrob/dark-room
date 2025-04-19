# Dark Room

An elegant application for a more civilized age

## Instructions

To remove an image from being viewed, delete the image from the `dr-reduced-images` bucket. The `dr-reduced-images` bucket is cache copy of `dr-original-images` bucket.

After deleting the image, then re-deploy the app to rebuild the HTML.


## Terraform

```
cd terraform
terraform init
terraform plan
terraform apply
```


## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploy

```
cd app/dark-room
# delete local next directory
# in case there's weird caching 
# issues
rm -rf .next/
# Create meta-images.json file
# which exists in the bucket
# as a static map to all the image files.
# When we build the static export for this app
# the app makes a network request to `/meta-images.json`.
# It receives a list of objects. Each object contains path
# information to the corresponding image file.
# With this list of image file data, the app then generates 
# all the html it needs for all the images. The JS, on scroll, will replace
# the image's default image with the real path to the real image 
# so that browswer can optimally load images.  
node ./scripts/create-images-meta.js
# upload this file to meta images
./scripts/deploy-meta-images.sh

# build static html
npm run build

# make sure assets points to current 
# working directory so page can find
# assets
sed -i '' 's|"/_next/|"./_next/|g' out/index.html
sed -i '' 's|"/_next/|"./_next/|g' ./out/details/*.html
# upload static assets to s3
./scripts/deploy-assets.sh
```
