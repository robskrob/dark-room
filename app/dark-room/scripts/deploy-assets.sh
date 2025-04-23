#!/bin/sh
aws s3 sync s3://dr-reduced-images s3://www.web-origin-dark-room-app/images 
aws s3 sync s3://dr-original-images s3://www.web-origin-dark-room-app/images 
aws s3 sync ../out/details s3://www.web-origin-dark-room-app/details

cp ../public/icon-image-file.svg ../out/icon-image-file.svg

aws s3 cp ../out/index.html s3://www.web-origin-dark-room-app
aws s3 cp ../out/index.txt s3://www.web-origin-dark-room-app
aws s3 cp ../out/icon-image-file.svg s3://www.web-origin-dark-room-app
aws s3 cp ../out/404.html s3://www.web-origin-dark-room-app
aws s3 cp ../out/_next s3://www.web-origin-dark-room-app/_next --recursive
