'use client'

import ImagePage from './image-page';

async function getData(sp: any) {
  const foo = await sp 

  console.log(foo)
  return ""
}

export default async function Page({ searchParams }: any) {
  const slug = await getData(searchParams);
  // const { imageId } = await params;
  // console.log("params", searchParams)
  // console.log("asset", searchParams.slug)
  // const { slug } = React.use(searchParams) 
  // const slug = searchParams.get('slug') || ""
  // const slug = searchParams?.slug ?? ""
  // const { slug } = use(searchParams)

  // const slug = Array.isArray(rawSlug)
  //   ? rawSlug[0]
  //   : rawSlug ?? 'Not provided';
  return (
    <ImagePage imageId={slug || ""} />
  );
}
