'use client';
import Image from "next/image";
import { InView } from 'react-intersection-observer';

export default function ImageGallery({ imageData }) {

  const imageList = [];
  for (const index in imageData) {
    const asset = imageData[index];


    imageList.push(
      <li key={index}>
        <InView triggerOnce={true}>
          {({ inView, ref, entry }) => (
            <div ref={ref}>
            <p>{`image inside viewport ${inView}.`}</p>

            <Image loading="lazy" src={inView ? "http://web-origin-dark-room-app.s3-website-us-east-1.amazonaws.com/" + asset.path : ""} alt={asset.alt} width={300} height={300}/>
            </div>
          )}
        </InView>
      </li>
    )
  }

  return (
    <ul>{imageList}</ul>
  )
}
