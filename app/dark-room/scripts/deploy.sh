#!/bin/sh



aws s3 sync s3://dr-reduced-images s3://web-origin-dark-room-app/images 

aws s3 cp ./out/index.html s3://web-origin-dark-room-app
aws s3 cp ./out/index.txt s3://web-origin-dark-room-app
aws s3 cp ./out/404.html s3://web-origin-dark-room-app
aws s3 cp ./out/meta-images.json s3://web-origin-dark-room-app
aws s3 cp ./out/_next s3://web-origin-dark-room-app/_next --recursive
