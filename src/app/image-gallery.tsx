'use client';
import { useState } from 'react';
import Image from "next/image";
import { InView } from 'react-intersection-observer';

export default function ImageGallery({ imageData }: any) {

  const imageList = [];
  const [clickedImages, setClickedImages] = useState([]);
  for (const index in imageData) {
    const asset = imageData[index];


    imageList.push(
      <li key={index}>
        <InView triggerOnce={true}>
          {({ inView, ref, entry }) => (
            <div ref={ref}>
            <p>{`image inside viewport ${inView}.`}</p>

            <Image onClick={(event) => {
              event.stopPropagation();
              setClickedImages( // Replace the state
                [ // with a new array
                    ...clickedImages, // that contains all the old items
                    { path: "http://web-origin-dark-room-app.s3-website-us-east-1.amazonaws.com/" + asset.path, alt: asset.alt  }
                  ]
              );

            }} loading="lazy" src={inView ? "http://web-origin-dark-room-app.s3-website-us-east-1.amazonaws.com/" + asset.path : "/icon-image-file.svg"} alt={asset.alt} width={300} height={300}/>
            </div>
          )}
        </InView>
      </li>
    )
  }

  return (
    <div className="flex flex-col relative gallery-viewport-max-height">
      <ul className="overflow-auto">{imageList}</ul>
    <button onClick={(event) => {
      event.stopPropagation();
      console.log(clickedImages)
    }} className="mt-4 w-full bg-green-400">Download</button>
    </div>
  );
}
