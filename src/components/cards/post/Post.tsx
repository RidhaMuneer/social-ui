// components
import PostImage from "./PostImage";
import PostUtils from "./PostUtils";

// types
import { PostProps } from "@/types/post";

// utils
import { dateFormat } from "@/utils/dateFormat";

const Post: React.FC<PostProps> = ({ user, img, likes, content, id, date }) => {
  return (
    <article className="flex flex-col gap-2 max-w-[500px]">
      <div className="flex justify-between gap-2 items-center mx-2">
        <div className="flex gap-3 items-center">
          <img
            src={user.img.src}
            alt={user.img.alt}
            className="w-10 h-10 rounded-full border"
          />
          <p className="text-sm text-muted-foreground">@{user.user}</p>
        </div>
        <p className="font-thin">{dateFormat(date)}</p>
      </div>
      <PostImage src={img.src} alt={img.alt} />
      <PostUtils post_id={id} />
      <div className="flex justify-start flex-col mx-2">
        <p className="font-medium">{likes} likes</p>
        <p>{content}</p>
      </div>
      <div className="space-y-1 mx-2">
        <p className="flex gap-2">
          <a href="#" className="font-medium">
            acme
          </a>
          This is a beautiful photo! 😍
        </p>
        <p className="flex gap-2">
          <a href="#" className="font-medium">
            shadcn
          </a>
          Wow, amazing shot! 🤩
        </p>
      </div>
      <div className="border-b-[1px] border-gray-400 w-full opacity-50" />
    </article>
  );
};

export default Post;