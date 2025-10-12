import { useEffect, useState } from "react";
import ImageGallery from "./ImageGallery";

export interface ImageAsset {
  path: string;
  alt: string;
}

function Home() {
  const [data, setData] = useState<ImageAsset[]>([]);

  useEffect(() => {
    const getMetaImages = async () => {
      const res = await fetch("/meta-images.json");
      if (!res.ok) {
        throw new Error("index page getData, Failed to fetch data");
      }

      const imgs: ImageAsset[] = await res.json();
      setData([...imgs]);
    };
    getMetaImages();
  }, []);

  return (
    <main className="min-h-screen min-dvh-screen flex flex-col items-center justify-center">
      <h2>On Vite</h2>
      <div className="main-padding lg:max-w-[150rem] z-10 w-full justify-center font-mono text-sm lg:flex">
        <ImageGallery imageData={data} />
      </div>
    </main>
  );
}

export default Home;
