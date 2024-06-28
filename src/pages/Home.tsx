import Post from "@/components/cards/post/Post";
import SearchInput from "@/components/search/SearchInput";
import usePosts from "@/hooks/post/usePosts";
import { PostCardProps } from "@/types/post";
import { useEffect, useState } from "react";

const Home = () => {
  const { posts } = usePosts();
  const [results, setResults] = useState<PostCardProps[]>();
  useEffect(() => {}, [results, posts]);
  return (
    <div className="flex flex-col justify-start items-center h-auto gap-4 mt-5 mb-16 min-h-screen w-full overflow-y">
      <SearchInput type="posts" setResults={setResults} />
      {results ? (
        <div className="gap-2 flex flex-col mt-16">
          {results.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              user={{
                img: {
                  src: post.owner.image_url,
                  alt: post.owner.username,
                },
                user: post.owner.username,
              }}
              img={{
                src: post.image_url,
                alt: post.image_url,
              }}
              likes={post.like_count}
              content={post.content}
              date={post.created_at}
            />
          ))}
          <div />
        </div>
      ) : (
        <div className="gap-2 flex flex-col mt-16">
          {posts?.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              user={{
                img: {
                  src: post.owner.image_url,
                  alt: post.owner.username,
                },
                user: post.owner.username,
              }}
              img={{
                src: post.image_url,
                alt: post.image_url,
              }}
              likes={post.like_count}
              content={post.content}
              date={post.created_at}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
