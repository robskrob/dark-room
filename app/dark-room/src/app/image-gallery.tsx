'use client';
import { useEffect, useState, useRef } from 'react';
import Image from "next/image";
import { InView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

type Asset = {
  path: string;
  alt: any;
};

export default function ImageGallery({ imageData }: any) {

  const baseUrl = "https://www.darkroom.cfd";
  const imageList = [];
  const router = useRouter();
  const storageKey = 'elementRefKey';
  const itemRefs = useRef({});

  const handlePopstate = () => {
    sessionStorage.setItem('isBack', 'true');
  }

  useEffect(() => {

    window.addEventListener('popstate', handlePopstate);

    const target = sessionStorage.getItem(storageKey);
    const isBack = sessionStorage.getItem('isBack');
    if (target && isBack === 'true') {
      itemRefs.current[target].scrollIntoView()
      sessionStorage.setItem('isBack', 'false');
    }
  }, []);

  for (const index in imageData) {
    const asset = imageData[index];
    let assetPath;
    if (asset.path.includes("/images/")) {
      assetPath = baseUrl + asset.path
    } else {
      assetPath = `${baseUrl}/images/` + asset.path
    }


    imageList.push(
      <li key={index} className="gallery-item" ref={(el: any) => (itemRefs.current[asset.path] = el)}>
        <InView triggerOnce={true}>
          {({ inView, ref, entry }) => (
            <div className={"flex flex-col"}>
              <a href="#">
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
            <Link className="block text-center p-[1em]" href={`/details/${asset.path}`} onClick={(event: any) => {
              console.log("target", asset.path)
              sessionStorage.setItem(storageKey, asset.path);
            }}>View Details </Link>
              </div>
            </div>
          )}
        </InView>
      </li>
    )
  }

  return (
    <div className="flex flex-col relative gallery-viewport-max-height">
      <ul className="gallery-grid justify-between overflow-auto">
        {imageList}
      </ul>
    </div>
  );
}
