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
node ./scripts/create-images-meta.js
# upload this file to meta images
./scripts/deploy-meta-images.sh

# build static html
npm run build


# upload static assets to s3
./scripts/deploy-app.sh
```

## Add images

1. authenticate into AWS
2. upload images to the s3 bucket called, "original"
3. serverless infra processes these images, reduces them in size and writes replica images to the s3 bucket called, 'reduced'
4. regenerate the JSON meta image file so the frontend knows about the new images 
