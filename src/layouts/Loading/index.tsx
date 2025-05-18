import { useEffect } from "react";
import { useImageStore } from "@services/stores/assetsStore";
import { flattenImageMap, unflattenImageMap } from "@utils/flattingNestedImage";
import * as imageList from "@assets/config";
import Loader from "./loader";

interface LoadingScreenProps {
  onFinish: () => void;
}

export default function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const { setImages } = useImageStore();

  useEffect(() => {
    const flatList = flattenImageMap(imageList);

    const preload = flatList.map(([key, src]) => {
      return new Promise<[string, string]>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve([key, src]);
        img.onerror = () => resolve([key, src]);
      });
    });

    Promise.all(preload).then((loaded) => {
      const flatMap = Object.fromEntries(loaded);
      const nested = unflattenImageMap(flatMap);
      setImages(nested);
      onFinish();
    });
  }, []);

  return (
    <section className="flex h-screen w-full items-center justify-center bg-slate-200">
      <Loader />
    </section>
  );
}
