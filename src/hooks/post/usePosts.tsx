// types
import { PostCardProps } from "@/types/post";

// react
import { useEffect, useState } from "react";

const usePosts = () => {
  const [posts, setPosts] = useState<PostCardProps[]>();
  const [error, setError] = useState<string>();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL_PROD}0/app/posts/`);
      if (response.ok) {
        const responseJson = await response.json();
        setPosts(responseJson);
      } else {
        const responseJson = await response.text();
        setError(responseJson);
      }
    };
    fetchPosts();
  }, []);

  return {
    posts,
    error,
  };
};

export default usePosts;
