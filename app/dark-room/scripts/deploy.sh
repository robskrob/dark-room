#!/bin/sh


cd ./scripts
rm -rf ../.next/
node ./create-images-meta.js
./deploy-meta-images.sh
cd ..
npm run build
sed -i '' 's|"/_next/|"./_next/|g' ./out/index.html
sed -i '' 's|"/_next/|"./_next/|g' ./out/details/*.html
cd ./scripts
./deploy-assets.sh

aws cloudfront create-invalidation --distribution-id E38ZHYUT0SSAF7 --paths "/*"
aws cloudfront create-invalidation --distribution-id ETR6F8LVOKAP8 --paths "/*"
