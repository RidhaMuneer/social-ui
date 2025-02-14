// types
import { PostCardProps } from "@/types/post";

// react
import { useEffect, useState } from "react";
import useUser from "../user/useUser";
import { getRecords } from "@/api/requests";

const usePosts = () => {
  const {user} = useUser();
  const [posts, setPosts] = useState<PostCardProps[]>();
  const [error, setError] = useState<string>();

  const fetchPosts = async() => {
    try {
      const response = await getRecords<PostCardProps[]>('/app/posts/');
      setPosts(response);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    error,
  };
};

export default usePosts;
