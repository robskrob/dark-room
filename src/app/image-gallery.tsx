'use client';
import { useState } from 'react';
import Image from "next/image";
import ImageGroup from './image-group';
import { InView } from 'react-intersection-observer';

export default function ImageGallery({ imageGroups }: any) {

  const groups = []
  for (const index in imageGroups) {
    groups.push(
      <li key={index}>
        <ImageGroup imageData={imageGroups[index]} />
      </li>
    )
  }

  return (
  <div className="flex flex-col relative gallery-viewport-max-height">
    <ul className="overflow-auto">
      {groups}
    </ul>
  </div>
  );
}
