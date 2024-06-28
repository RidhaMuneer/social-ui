// types
import { PostImageProps } from "@/types/post";

const PostImage: React.FC<PostImageProps> = ({ src, alt }) => {
  return (
    <div className="max-w-[500px] max-h-[500px] overflow-hidden">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
};

export default PostImage;
