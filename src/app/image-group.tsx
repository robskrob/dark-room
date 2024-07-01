'use client';
import { useState } from 'react';
import Image from "next/image";
import { InView } from 'react-intersection-observer';

export default function ImageGroup({ imageData }: any) {

  const imageList = imageData.map((image: any, index: any) => {
    const asset = imageData[index];


    return (
      <li key={index}>
        <InView triggerOnce={true}>
          {({ inView, ref, entry }) => (
            <div ref={ref}>
            <p>{`image inside viewport ${inView}.`}</p>

            <Image onClick={(event) => {
            }} loading="lazy" src={inView ? "http://web-origin-dark-room-app.s3-website-us-east-1.amazonaws.com/" + asset.path : "/icon-image-file.svg"} alt={asset.alt} width={300} height={300}/>
            </div>
          )}
        </InView>
      </li>
    )

  });

  return (
      <ul className="overflow-auto">{imageList}</ul>
  )
}
