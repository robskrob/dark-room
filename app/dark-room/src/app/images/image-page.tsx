'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";

export default function ImagePage({ imageId }: { imageId: string }) {
  // const [image, setImage] = useState<any>(null);

  // useEffect(() => {
  //   // Replace with real API or data fetch
  //   console.log("imageId", imageId)
  //   const fetchImage = async () => {
  //     const res = await fetch(`https://web-origin-dark-room-app.s3.us-east-1.amazonaws.com/images/reduced-P1060021.JPG`);
  //     const data = await res.json();
  //     setImage(data);
  //   };

  //   fetchImage();
  // }, [imageId]);

  // if (!image) return <p>Loading...</p>;

  return (
    <div>
      <h1>"test show"</h1>
      <Image 
        loading="lazy" 
        src={`https://web-origin-dark-room-app.s3.us-east-1.amazonaws.com/images/${imageId}`}
        className="transparent-border-img"
        alt="test-alt" 
        width={300} 
        height={300} />
    </div>
  );
}

