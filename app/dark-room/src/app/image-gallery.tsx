'use client';
import { useState } from 'react';
import Image from "next/image";
import { InView } from 'react-intersection-observer';

type Asset = {
  path: string;
  alt: any;
};

export default function ImageGallery({ imageData }: any) {

  const imageList = [];
  const [clickedImages, setClickedImages] = useState<Asset[]>([]);
  for (const index in imageData) {
    const asset = imageData[index];

    imageList.push(
      <li key={index}>
        <InView triggerOnce={true}>
          {({ inView, ref, entry }) => (
            <div>
            <p>{`image inside viewport ${inView}.`}</p>
              <a href="#"  onClick={(event: any) => {
                event.stopPropagation();
                console.log("event.target", event.target)
                console.log("event.target.classList", event.target.classList)
                if (event.target.classList.contains('clicked--img')) {
                  event.target.classList.add('transparent-border-img')
                  event.target.classList.remove('clicked--img')
                } else {
                  event.target.classList.add("clicked--img")
                  event.target.classList.remove('transparent-border-img')
                }

                // clickedImages.push({ path: "http://web-origin-dark-room-app.s3-website-us-east-1.amazonaws.com/" + asset.path, alt: asset.alt  })
                
                // setClickedImages(clickedImages);
                
                // https://web-origin-dark-room-app.s3.us-east-1.amazonaws.com

                const rootPath = "https://web-origin-dark-room-app.s3.us-east-1.amazonaws.com/images/"

                setClickedImages( // Replace the state
                  [ // with a new array
                      ...clickedImages, // that contains all the old items
                      { path: rootPath + asset.path, alt: asset.alt  }
                    ]
                );
              }} >
                <Image 
                  ref={ref}
                  loading="lazy" 
                  src={inView ? "https://web-origin-dark-room-app.s3.us-east-1.amazonaws.com/images/" + asset.path : "/icon-image-file.svg"} 
                  className="transparent-border-img"
                  alt={asset.alt} 
                  width={300} 
                  height={300} />
              </a>
            </div>
          )}
        </InView>
      </li>
    )
  }

  return (
    <div className="flex flex-col relative gallery-viewport-max-height">
      <ul className="overflow-auto px-4">{imageList}</ul>
    <button onClick={(event) => {
      event.stopPropagation();
    }} className="mt-4 w-full bg-green-400">Download</button>
    </div>
  );
}
