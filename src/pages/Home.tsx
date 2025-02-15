import Post from "@/components/cards/post/Post"
import usePosts from "@/hooks/post/usePosts"

const Home = () => {
  const { posts, isLoading } = usePosts()

  if (isLoading) return <LoadingHome />

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
              id: post.owner_id,
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
  )
}

const LoadingHome = () => {
  return (
    <div className="flex flex-col justify-start items-center gap-4 mb-16 lg:mb-2 min-h-screen w-full overflow-y">
      <div className="gap-2 flex flex-col my-5 w-full max-w-[468px]">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="w-full bg-white animate-pulse">
            {/* Header */}
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <div className="w-24 h-4 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Image */}
            <div className="aspect-square w-full bg-gray-200" />

            {/* Actions */}
            <div className="p-3">
              <div className="flex justify-between mb-2">
                <div className="flex gap-4">
                  <div className="w-6 h-6 bg-gray-200 rounded" />
                  <div className="w-6 h-6 bg-gray-200 rounded" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="w-20 h-4 bg-gray-200 rounded" />
                <div className="w-full h-4 bg-gray-200 rounded" />
                <div className="w-3/4 h-4 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home

