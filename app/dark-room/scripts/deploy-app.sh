npm run build && 
  aws s3 cp dist/index.html s3://www.web-origin-dark-room-app && 
  aws s3 cp dist/assets s3://www.web-origin-dark-room-app/assets --recursive && 
  aws cloudfront create-invalidation --distribution-id E38ZHYUT0SSAF7 --paths "/*" && 
  aws cloudfront create-invalidation --distribution-id ETR6F8LVOKAP8 --paths "/*"
