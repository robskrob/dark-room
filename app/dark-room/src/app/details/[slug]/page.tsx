import Image from "next/image";

async function getData() {
  const res = await fetch('https://www.darkroom.cfd/meta-images.json')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export async function generateStaticParams() {
  const res = await fetch('https://www.darkroom.cfd/meta-images.json')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const imgs = await res.json()

  return imgs.map((m: any) => {
    return {
      slug: m.path
    }
  })
}


export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <div className="flex justify-center">
      <Image 
        loading="lazy" 
        src={`https://www.darkroom.cfd/images/${slug.replace("reduced-", "")}`}
        className="max-h-screen transparent-border-img"
        alt="test-alt" 
        width={300} 
        height={300} />
    </div>
  )
}
