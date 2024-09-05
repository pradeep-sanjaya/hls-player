## Steps ##
- Upload a .mpeg media file to an input bucket (ar-127-bucket-input-video).
- This will invoke a Lambda function triggered by the bucket's PUT operation to create an Elemental MediaConvert transcode job.
- Output the transcoded video (.m3u8) to an output bucket (ar-127-lambda-media-convert).
- Play the S3-hosted .m3u8 video from a React app.

## HLS Player Dependencies ##
- node.js v14.21.3
- hls.js 1.5.15

## Run
```
npm start
```

### Verify ###
- Open http://localhost:3000 in your browser.
