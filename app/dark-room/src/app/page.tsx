// 'use client';

import ImageGallery from "./image-gallery";

async function getData() {
  const res = await fetch("https://www.darkroom.cfd/meta-images.json");

  if (!res.ok) {
    throw new Error("index page getData, Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="min-h-screen items-center justify-center flex flex-col">
      <div className="main-padding main-max-width  z-10 w-full justify-center font-mono text-sm lg:flex">
        <ImageGallery imageData={data} />
      </div>
    </main>
  );
}
