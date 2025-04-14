// 'use client'
// import { useEffect } from 'react'
import Image from "next/image";
// import { useParams } from 'next/navigation';

async function getData() {
  const res = await fetch('http://web-origin-dark-room-app.s3-website-us-east-1.amazonaws.com/meta-images.json')

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export async function generateStaticParams() {
  const res = await fetch('http://web-origin-dark-room-app.s3-website-us-east-1.amazonaws.com/meta-images.json')

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const imgs = await res.json()

  return imgs.map((m: any) => {
    return {
      slug: m.path
    }
  })

  // return res.json()
  // return [{ slug: '1' }, { slug: '2' }, { slug: '3' }]
}


export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  console.log("slug", slug)


  return (
    <div>
      <h1>"test show"</h1>
      <Image 
        loading="lazy" 
        src={`https://web-origin-dark-room-app.s3.us-east-1.amazonaws.com/images/${slug}`}
        className="transparent-border-img"
        alt="test-alt" 
        width={300} 
        height={300} />
    </div>
  )
}
