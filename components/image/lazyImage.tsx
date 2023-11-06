import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

interface IProps {
  src: string;
  alt: string;
}

export default function LazyImage({ src, alt }: IProps) {
  return (
    <LazyLoadImage
      className="h-auto max-w-full rounded-lg"
      src={src}
      alt={alt}
      effect="opacity"
    />
  );
}
