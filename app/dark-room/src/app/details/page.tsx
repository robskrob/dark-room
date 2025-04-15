import Image from "next/image";

export default async function Page({
    searchParams,
  
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined  }>
  
}) {
  // const slug = await params
  const sp = (await searchParams)

  const slug = sp.slug




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
