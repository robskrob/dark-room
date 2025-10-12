import { useEffect, useRef } from "react";
import { InView } from "react-intersection-observer";
import type { ImageAsset } from "./Home";

export default function ImageGallery({
  imageData,
}: {
  imageData: ImageAsset[];
}) {
  const baseUrl = "https://www.darkroom.cfd";
  const imageList = [];
  const storageKey = "elementRefKey";
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});

  const handlePopstate = () => {
    sessionStorage.setItem("isBack", "true");
  };

  useEffect(() => {
    window.addEventListener("popstate", handlePopstate);

    const target = sessionStorage.getItem(storageKey);
    const isBack = sessionStorage.getItem("isBack");
    if (target && isBack === "true") {
      sessionStorage.setItem("isBack", "false");
      const element = itemRefs.current[target];

      if (element) {
        element.scrollIntoView({ block: "start" });
      }
    }
  }, []);

  for (const index in imageData) {
    const asset = imageData[index];
    let assetPath;
    if (asset.path.includes("/images/")) {
      assetPath = baseUrl + asset.path;
    } else {
      assetPath = `${baseUrl}/images/` + asset.path;
    }

    imageList.push(
      <li
        key={index}
        className="w-full md:max-w-[50%] lg:max-w-[33%]"
        ref={(el: HTMLLIElement | null) => {
          if (el) {
            itemRefs.current[asset.path] = el;
          }
        }}
      >
        <InView triggerOnce={true}>
          {({ inView, ref }) => (
            <div className={"flex flex-col"}>
              <a href="#" className="w-full">
                <img
                  ref={ref}
                  loading="lazy"
                  src={inView ? assetPath : "/icon-image-file.svg"}
                  className="transparent-border-img w-full"
                  alt={asset.alt}
                  width={300}
                  height={300}
                />
              </a>
              <div>
                <a
                  className="block text-center p-[1em]"
                  href={`/details/${asset.path}`}
                  onClick={() => {
                    sessionStorage.setItem(storageKey, asset.path);
                  }}
                >
                  View Details{" "}
                </a>
              </div>
            </div>
          )}
        </InView>
      </li>,
    );
  }

  return (
    <div className="flex flex-col-reverse overflow-y-auto  relative gallery-viewport-max-height">
      <ul className="flex flex-wrap justify-between">{imageList}</ul>
    </div>
  );
}
