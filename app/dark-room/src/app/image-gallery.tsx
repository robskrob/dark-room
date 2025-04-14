'use client';
import { useState } from 'react';
import Image from "next/image";
import { InView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

// import ImageView from './images/[imageId]/image-view';


type Asset = {
  path: string;
  alt: any;
};

export default function ImageGallery({ imageData }: any) {

  const baseUrl = "https://web-origin-dark-room-app.s3.us-east-1.amazonaws.com";
  const imageList = [];
  const [clickedImages, setClickedImages] = useState<Asset[]>([]);
  const router = useRouter();

  for (const index in imageData) {
    const asset = imageData[index];
    // const rootPath = "https://web-origin-dark-room-app.s3.us-east-1.amazonaws.com/images/"

    // const assetPath = `${baseUrl}/${asset.path}`
    let assetPath;
    if (asset.path.includes("/images/")) {
      assetPath = baseUrl + asset.path
    } else {
      assetPath = `${baseUrl}/images/` + asset.path
    }

    // const goToImage = (slug: string) => {
    //   // router.push({pathname: '/images', query: {id: "2"}});
    //   router.push(`/images/1`);
    // };


    imageList.push(
      <li key={index}>
        <InView triggerOnce={true}>
          {({ inView, ref, entry }) => (
            <div className="flex flex-col">
              <a href="#"  onClick={(event: any) => {
                event.stopPropagation();
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


                setClickedImages( // Replace the state
                  [ // with a new array
                      ...clickedImages, // that contains all the old items
                      { path: assetPath, alt: asset.alt  }
                    ]
                );
              }} >
                <Image 
                  ref={ref}
                  loading="lazy" 
                  src={inView ? assetPath : "/icon-image-file.svg"} 
                  className="transparent-border-img"
                  alt={asset.alt} 
                  width={300} 
                  height={300} />
              </a>
              <div>
                <Link href={`/details/${asset.path}`}>view details </Link>
              </div>
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
              // <a 
              //   href="#" 
              //   onClick={() => router.push('/images/2')}
              //   className="block p-[1em] text-center"> 
              //   View Details 
              // </a>
