// types
import { PostCardProps } from "@/types/post";

// react
import { useEffect, useState } from "react";

// api
import { getRecords } from "@/api/requests";

const usePosts = () => {
  const [posts, setPosts] = useState<PostCardProps[]>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPosts = async() => {
    setIsLoading(true);
    try {
      const response = await getRecords<PostCardProps[]>('/app/posts/');
      setPosts(response);
      setIsLoading(false);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    error,
    isLoading
  };
};

export default usePosts;
