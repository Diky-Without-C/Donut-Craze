import { create } from "zustand";

export type ImageMap = {
  [key: string]: string | ImageMap;
};

interface ImageStore {
  images: ImageMap;
  setImages: (images: ImageMap | ((self: ImageMap) => ImageMap)) => void;
}

const useImageStore = create<ImageStore>((set) => ({
  images: {},
  setImages: (images) => {
    set((state) => ({
      images: typeof images === "function" ? images(state.images) : images,
    }));
  },
}));

export { useImageStore };
