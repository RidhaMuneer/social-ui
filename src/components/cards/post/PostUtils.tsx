// react
import { useState } from "react";

// types
import { PostUtilsProps } from "@/types/post";

// hooks
import useUser from "@/hooks/user/useUser";

// icons
import CommentIcon from "@/icons/CommentIcon";
import HeartIcon from "@/icons/HeartIcon";

const PostUtils: React.FC<PostUtilsProps> = ({ post_id }) => {
  const [likeClicked, setLikeClicked] = useState<boolean>(false);
  const { handleGetAccessToken } = useUser();
  const handleLikeClick = async () => {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${handleGetAccessToken()}`);
    headers.append("Content-Type", "application/json");
    const response = await fetch("http://127.0.0.1:8000/app/like", {
      headers: headers,
      method: "POST",
      body: JSON.stringify({
        post_id: post_id,
        dir: 1,
      }),
    });
    if (response.ok) {
      setLikeClicked(true);
      const responseJson = await response.json();
      console.log(responseJson);
    }
  };

  const handleCommentClick = () => {};
  return (
    <div className="flex justify-start gap-4 items-center mx-2">
      <HeartIcon
        className="hover:cursor-pointer"
        color={likeClicked ? "red" : "white"}
        onClick={handleLikeClick}
      />
      <CommentIcon
        className="hover:cursor-pointer"
        onClick={handleCommentClick}
      />
    </div>
  );
};

export default PostUtils;
