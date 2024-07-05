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

// Return a list of `params` to populate the [slug] dynamic segment
export function generateStaticParams() {
  // return ['/albums/test', '/albums/fun']
  return [{ slug: 'test' }, { slug: 'fun' }, { id: '3' }]
}

export default async function Page({ params }: { params: { slug: string } }) {

  const data = await getData();
  const { slug } = params


  return (
    <div>
      <p>Testing <span className="blue-color">hello</span> world </p> and  {slug}
      <ImageGallery imageData={data}/>
    </div>
  );
}
