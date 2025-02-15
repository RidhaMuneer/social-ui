import { useGetUser } from "@/hooks/user/useGetUser"
import { dateFormat } from "@/utils/dateFormat"
import { UserIcon, Mail, UsersIcon, Grid, Archive } from "lucide-react"
import { useState } from "react"
import { Dialog } from "@headlessui/react"
import { PostCardProps } from "@/types/post"
import Post from "@/components/cards/post/Post"

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts")
  const { user, isLoading } = useGetUser()
  const [selectedPost, setSelectedPost] = useState<PostCardProps | null>(null)

  const handlePostClick = (post: PostCardProps) => {
    setSelectedPost(post)
  }

  if (isLoading) return <LoadingProfile />

  if (!user) return <div className="text-center text-gray-500">User not found</div>;

  const publishedPosts = user?.posts?.filter((post) => post.published) || [];
  const archivedPosts = user?.posts?.filter((post) => !post.published) || [];

  return (
    <div className="flex flex-col justify-start items-center gap-4 mb-16 lg:mb-2 md:ml-20 min-h-screen w-full md:min-w-[80%] overflow-y">
      <div className="overflow-hidden w-full">
        {/* Cover Photo */}
        <div className="h-48 md:h-64 bg-gradient-to-r from-blue-400 to-purple-500 relative">
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent opacity-50"></div>
        </div>

        {/* User Information Section */}
        <div className="px-6 py-8 sm:px-8 flex flex-col md:px-10 items-center justify-center space-y-4 md:space-y-0 md:space-x-6 -mt-16 relative z-10">
          <div className="relative w-32 h-32 md:w-40 md:h-40 border-4 border-white rounded-full shadow-md overflow-hidden">
            <img src={user?.image_url || "/placeholder.svg"} alt={user?.username || "User"} className="object-cover" />
          </div>
          <div className="text-center md:text-left flex flex-col items-center justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">@{user!.username}</h1>
            <div className="mt-2 flex items-center justify-center md:justify-start text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              <span>{user!.email}</span>
            </div>
            <div className="mt-4 flex space-x-4 text-sm">
              <div className="flex items-center">
                <UsersIcon className="w-4 h-4 mr-1" />
                <span>
                  <strong>{user!.follower_count}</strong> Followers
                </span>
              </div>
              <div className="flex items-center">
                <UserIcon className="w-4 h-4 mr-1" />
                <span>
                  <strong>{user!.following_count}</strong> Following
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b flex items-center justify-center border-gray-200">
          <nav className="flex justify-center md:justify-start px-6 md:px-10 -mb-px">
            <button
              onClick={() => setActiveTab("posts")}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === "posts"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } transition-colors duration-200`}
            >
              <Grid className="w-5 h-5 inline mr-2" />
              Posts
            </button>
            <button
              onClick={() => setActiveTab("archive")}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === "archive"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } transition-colors duration-200`}
            >
              <Archive className="w-5 h-5 inline mr-2" />
              Archive
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 md:p-10 w-full">
          {activeTab === "posts" && publishedPosts.length !== 0 &&(
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {publishedPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => handlePostClick({id: post.id, content: post.content, published: post.published, image_url: post.image_url, isLiked: post.isLiked, created_at: post.created_at, owner: user, owner_id: post.owner_id, like_count: post.like_count})}
                  className="relative aspect-square rounded-lg overflow-hidden group shadow-md transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src={post.image_url || "/placeholder.svg"}
                    alt={post.content}
                    className="transition-transform duration-300 object-cover group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                    <div className="text-white">
                      <p className="font-semibold truncate">{post.content}</p>
                      <p className="text-sm">{dateFormat(post.created_at)} ago</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "posts" && publishedPosts.length === 0 && (
            <div className="flex items-center justify-center">No posts to show</div>
          )}
          {activeTab === "archive" && archivedPosts.length !== 0 && (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {archivedPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => handlePostClick({id: post.id, content: post.content, published: post.published, image_url: post.image_url, isLiked: post.isLiked, created_at: post.created_at, owner: user, owner_id: post.owner_id, like_count: post.like_count})}
                  className="relative aspect-square w-full rounded-lg overflow-hidden group shadow-md transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src={post.image_url || "/placeholder.svg"}
                    alt={post.content}
                    className="transition-transform duration-300 object-cover group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                    <div className="text-white">
                      <p className="font-semibold truncate">{post.content}</p>
                      <p className="text-sm">{dateFormat(post.created_at)} ago</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === "archive" && archivedPosts.length === 0 && (
            <div className="flex items-center justify-center">No archives to show</div>
          )}
        </div>
      </div>
      {/* Post Popup */}
      <Dialog open={selectedPost !== null} onClose={() => setSelectedPost(null)}>
        <div className="fixed inset-0 bg-black/30 z-50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <Dialog.Panel className="mx-auto max-w-md rounded bg-white">
            {selectedPost && (
              <Post
                key={selectedPost.id}
                id={selectedPost.id}
                user={{
                  img: {
                    src: selectedPost.owner.image_url,
                    alt: selectedPost.owner.username,
                  },
                  user: selectedPost.owner.username,
                  id: selectedPost.owner_id,
                }}
                img={{
                  src: selectedPost.image_url,
                  alt: selectedPost.image_url,
                }}
                isLiked={selectedPost.isLiked}
                likes={selectedPost.like_count}
                content={selectedPost.content}
                date={selectedPost.created_at}
              />
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}

const LoadingProfile = () => {
  return (
    <div className="flex flex-col justify-start items-center gap-4 mb-16 lg:mb-2 md:ml-20 min-h-screen w-full md:min-w-[80%] overflow-y animate-pulse">
      <div className="overflow-hidden w-full">
        {/* Cover Photo */}
        <div className="h-48 md:h-64 bg-gray-300"></div>

        {/* User Information Section */}
        <div className="px-6 py-8 sm:px-8 flex flex-col md:px-10 items-center justify-center space-y-4 md:space-y-0 md:space-x-6 -mt-16 relative z-10">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-300"></div>
          <div className="text-center md:text-left flex flex-col items-center justify-center">
            <div className="w-48 h-8 bg-gray-300 rounded"></div>
            <div className="mt-2 w-40 h-4 bg-gray-300 rounded"></div>
            <div className="mt-4 flex space-x-4">
              <div className="w-24 h-4 bg-gray-300 rounded"></div>
              <div className="w-24 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b flex items-center justify-center border-gray-200">
          <nav className="flex justify-center md:justify-start px-6 md:px-10 -mb-px">
            <div className="w-24 h-10 bg-gray-300 rounded mr-4"></div>
            <div className="w-24 h-10 bg-gray-300 rounded"></div>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 md:p-10 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="aspect-square rounded-lg bg-gray-300"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

