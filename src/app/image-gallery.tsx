'use client';
import Image from "next/image";

export default function ImageGallery({ imageData }) {

  const imageList = [];
  for (const index in imageData) {
    const asset = imageData[index];
    const onScrollCB = (event: any) => {
      console.log("event ", event)

    }

    imageList.push(<li onScroll={onScrollCB} key={index}><Image loading="lazy" src={"http://web-origin-dark-room-app.s3-website-us-east-1.amazonaws.com/" + asset.path} alt={asset.alt} width={300} height={300}/></li>)
  }

  return (
    <ul>{imageList}</ul>
  )
}
