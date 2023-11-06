import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

interface IProps {
  src: string;
  alt: string;
  content: string;
}

export default function InContentImage({ src, content, alt }: IProps) {
  return (
    <div className="relative max-w-full aspect-square">
      <LazyLoadImage
        className="rounded-lg object-cover max-w-full aspect-square"
        src={src}
        alt={alt}
        effect="opacity"
      />
      <div className="absolute left-0 bottom-0 bg-gradient-to-t from-[#000000a8] from-60% to-transparent w-full h-1/5 flex items-center pt-4 px-4">
        <p className="text-sm text-center text-white">{content}</p>
      </div>
    </div>
  );
}
