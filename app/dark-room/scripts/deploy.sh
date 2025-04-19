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
