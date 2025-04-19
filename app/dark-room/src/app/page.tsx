// 'use client';

import ImageGallery from "./image-gallery";


async function getData() {
  const res = await fetch('http://www.web-origin-dark-room-app.s3-website-us-east-1.amazonaws.com/meta-images.json')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
        <ImageGallery imageData={data}/>
      </div>
    </main>
  );
}
