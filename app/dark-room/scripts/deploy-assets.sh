#!/bin/sh
aws s3 sync s3://dr-reduced-images s3://www.web-origin-dark-room-app/images 
aws s3 sync s3://dr-original-images s3://www.web-origin-dark-room-app/images 

