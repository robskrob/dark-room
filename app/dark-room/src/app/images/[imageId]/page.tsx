'use client'
import { useEffect } from 'react'
import Image from "next/image";
import { useParams } from 'next/navigation';


export default function Page() {
  const params = useParams();

  return (
    <div>
      <h1>"test show"</h1>
      <Image 
        loading="lazy" 
        src={`https://web-origin-dark-room-app.s3.us-east-1.amazonaws.com/images/${params.imageId}`}
        className="transparent-border-img"
        alt="test-alt" 
        width={300} 
        height={300} />
    </div>
  )
}
