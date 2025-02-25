import { useGetUser } from "@/hooks/user/useGetUser"
import { dateFormat } from "@/utils/dateFormat"
import { Mail, Grid, Archive, Heart, ImageIcon, UserMinus, UserPlus } from "lucide-react"
import { useState } from "react"
import { Dialog } from "@headlessui/react"
import { PostCardProps } from "@/types/post"
import Post from "@/components/cards/post/Post"
import useUser from "@/hooks/user/useUser"
import Button from "@/components/button/Button"
import { createRecord } from "@/api/requests"

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts")
  const { user, isLoading } = useGetUser()
  const [isFollowed, setIsFollowed] = useState<boolean>(false)
  const [selectedPost, setSelectedPost] = useState<PostCardProps | null>(null)
  const { user: currentUser } = useUser()
  const isCurrentUser = currentUser?.id === user?.id

  const handlePostClick = (post: PostCardProps) => {
    setSelectedPost(post)
  }

  const handleFollow = async () => {
    try {
      await createRecord<{ user_id: number; dir: number }, { message: string }>("/app/follow/", {
        user_id: user!.id,
        dir: isFollowed ? 0 : 1,
      })
      setIsFollowed(!isFollowed)
    } catch (error) {
      console.error("Failed to follow/unfollow user:", error)
    }
  }

  if (isLoading) return <LoadingProfile />

  if (!user) return <div className="text-center text-gray-500">User not found</div>

  const publishedPosts = user?.posts?.filter((post) => post.published) || []
  const archivedPosts = user?.posts?.filter((post) => !post.published) || []

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* User Information Section */}
        <div className="px-6 py-8 sm:px-8 md:px-10 flex flex-col items-center justify-center relative">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-purple-200 shadow-lg mb-6">
            <img
              src={user?.image_url || "/placeholder.svg"}
              alt={user?.username || "User"}
              className="object-cover w-full h-full"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">@{user!.username}</h1>
          <div className="flex items-center justify-center text-gray-600 mb-4">
            <Mail className="w-5 h-5 mr-2" />
            <span>{user!.email}</span>
          </div>
          <div className="flex space-x-8 text-sm mb-6">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-gray-800">{user!.follower_count}</span>
              <span className="text-gray-600">Followers</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-gray-800">{user!.following_count}</span>
              <span className="text-gray-600">Following</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-gray-800">{publishedPosts.length}</span>
              <span className="text-gray-600">Posts</span>
            </div>
          </div>
          {!isCurrentUser && (
            <Button
              onClick={handleFollow}
              className={`${isFollowed
                  ? 'bg-purple-300 text-purple-600 hover:bg-purple-200'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
                } transition-colors duration-300 flex items-center`}
            >
              {isFollowed ? (
                <>
                  <UserMinus size={20} className="mr-2" />
                  Unfollow
                </>
              ) : (
                <>
                  <UserPlus size={20} className="mr-2" />
                  Follow
                </>
              )}
            </Button>
          )}
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-200">
          <nav className="flex justify-center">
            <button
              onClick={() => setActiveTab("posts")}
              className={`py-4 px-6 text-sm font-medium flex items-center ${activeTab === "posts"
                  ? "text-purple-600 border-b-2 border-purple-500"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } transition-colors duration-200`}
            >
              <Grid className="w-5 h-5 mr-2" />
              Posts
            </button>
            {isCurrentUser && (
              <button
                onClick={() => setActiveTab("archive")}
                className={`py-4 px-6 text-sm font-medium flex items-center ${activeTab === "archive"
                    ? "text-purple-600 border-b-2 border-purple-500"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } transition-colors duration-200`}
              >
                <Archive className="w-5 h-5 mr-2" />
                Archive
              </button>
            )}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 md:p-10">
          {activeTab === "posts" && publishedPosts.length !== 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {publishedPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() =>
                    handlePostClick({
                      id: post.id,
                      content: post.content,
                      published: post.published,
                      image_url: post.image_url,
                      isLiked: post.isLiked,
                      created_at: post.created_at,
                      owner: user,
                      owner_id: post.owner_id,
                      like_count: post.like_count,
                    })
                  }
                  className="relative aspect-square rounded-lg overflow-hidden group shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer"
                >
                  <img
                    src={post.image_url || "/placeholder.svg"}
                    alt={post.content}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                    <div className="text-white">
                      <p className="font-semibold truncate">{post.content}</p>
                      <p className="text-sm">{dateFormat(post.created_at)} ago</p>
                      <div className="flex items-center mt-2">
                        <Heart className="w-4 h-4 mr-1 text-red-500" />
                        <span>{post.like_count} likes</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "posts" && publishedPosts.length === 0 && (
            <div className="flex flex-col items-center justify-center text-gray-500 py-12">
              <ImageIcon className="w-16 h-16 mb-4 text-gray-400" />
              <p className="text-xl font-semibold mb-2">No posts yet</p>
              <p>Start sharing your moments with the world!</p>
            </div>
          )}
          {activeTab === "archive" && archivedPosts.length !== 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {archivedPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() =>
                    handlePostClick({
                      id: post.id,
                      content: post.content,
                      published: post.published,
                      image_url: post.image_url,
                      isLiked: post.isLiked,
                      created_at: post.created_at,
                      owner: user,
                      owner_id: post.owner_id,
                      like_count: post.like_count,
                    })
                  }
                  className="relative aspect-square rounded-lg overflow-hidden group shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer"
                >
                  <img
                    src={post.image_url || "/placeholder.svg"}
                    alt={post.content}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                    <div className="text-white">
                      <p className="font-semibold truncate">{post.content}</p>
                      <p className="text-sm">{dateFormat(post.created_at)} ago</p>
                      <div className="flex items-center mt-2">
                        <Heart className="w-4 h-4 mr-1 text-red-500" />
                        <span>{post.like_count} likes</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === "archive" && archivedPosts.length === 0 && (
            <div className="flex flex-col items-center justify-center text-gray-500 py-12">
              <Archive className="w-16 h-16 mb-4 text-gray-400" />
              <p className="text-xl font-semibold mb-2">No archived posts</p>
              <p>Your archived posts will appear here</p>
            </div>
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
    <div className="flex flex-col items-center min-h-screen w-full bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden animate-pulse">
        <div className="px-6 py-8 sm:px-8 md:px-10 flex flex-col items-center justify-center relative">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-300 mb-6"></div>
          <div className="w-48 h-8 bg-gray-300 rounded mb-2"></div>
          <div className="w-40 h-4 bg-gray-300 rounded mb-4"></div>
          <div className="flex space-x-8 mb-6">
            <div className="w-20 h-16 bg-gray-300 rounded"></div>
            <div className="w-20 h-16 bg-gray-300 rounded"></div>
            <div className="w-20 h-16 bg-gray-300 rounded"></div>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <div className="flex justify-center p-4">
            <div className="w-24 h-10 bg-gray-300 rounded mr-4"></div>
            <div className="w-24 h-10 bg-gray-300 rounded"></div>
          </div>
        </div>
        <div className="p-6 sm:p-8 md:p-10">
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

