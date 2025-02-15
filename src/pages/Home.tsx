import Post from "@/components/cards/post/Post";
import usePosts from "@/hooks/post/usePosts";

const Home = () => {
  const { posts } = usePosts();
  return (
    <div className="flex flex-col justify-start items-center gap-4 mb-16 lg:mb-2 min-h-screen w-full overflow-y">
      <div className="gap-2 flex flex-col my-5">
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
            isLiked={post.isLiked}
            likes={post.like_count}
            content={post.content}
            date={post.created_at}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
