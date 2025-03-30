```
npm run build
aws lambda update-function-code --function-name dark-room-image-reducer \\n--region=us-east-1 \\n--zip-file fileb://image-reducer.zip
```
