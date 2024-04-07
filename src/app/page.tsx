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
  console.log("data ", data)
  const truncated = [data[0], data[1], data[2], data[3], data[4]]

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p>Testing <span className="blue-color">this</span> bucket </p>
        <ImageGallery imageData={truncated}/>
      </div>
    </main>
  );
}
