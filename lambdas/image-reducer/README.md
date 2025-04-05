```
npm run build
aws lambda update-function-code --function-name dr-image-reducer --region=us-east-1 --zip-file fileb://image-reducer.zip
```
