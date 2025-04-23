// 'use client';

import ImageGallery from "./image-gallery";


async function getData() {
  const res = await fetch('https://www.darkroom.cfd/meta-images.json')

  if (!res.ok) {
    throw new Error('index page getData, Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="main-container min-h-screen items-center justify-between flex lex-col">
      <div className="z-10 w-full justify-center font-mono text-sm lg:flex">
        <ImageGallery imageData={data}/>
      </div>
    </main>
  );
}
