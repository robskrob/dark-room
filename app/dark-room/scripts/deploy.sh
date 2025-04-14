#!/bin/sh

cd ./scripts
node ./create-images-meta.js
./deploy-meta-images.sh
cd ..
npm run build
sed -i '' 's|"/_next/|"./_next/|g' ./out/index.html
cd ./scripts
./deploy-assets.sh
