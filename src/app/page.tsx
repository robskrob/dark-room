// 'use client';

import ImageGallery from "@/components/image-gallery";


async function getData() {
  const res = await fetch('http://web-origin-dark-room-app.s3-website-us-east-1.amazonaws.com/meta-images.json')

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const data = await getData();

  return (
    <div>
      <p>Testing <span className="blue-color">this</span> bucket </p>
      <ImageGallery imageData={data}/>
    </div>
  );
}
