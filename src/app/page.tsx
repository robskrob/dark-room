// 'use client';

import ImageGallery from "./image-gallery";


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
  const groups = data.reduce((acc: any, item: any, index: any) => {
    if (index % 10 === 0) {
      acc.push([item]);
    } else {
      acc[acc.length - 1].push(item);
    }

    return acc
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p>Testing <span className="blue-color">this</span> bucket </p>
        <ImageGallery imageGroups={groups}/>
      </div>
    </main>
  );
}
