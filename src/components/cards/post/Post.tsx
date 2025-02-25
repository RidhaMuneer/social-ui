import { useState } from "react"
import { Heart, MessageCircle, Send, ChevronDown } from "lucide-react"
import type { PostProps, Comment } from "@/types/post"
import { dateFormat } from "@/utils/dateFormat"
import { createRecord, getRecords } from "@/api/requests"
import useUser from "@/hooks/user/useUser"
import { useNavigate } from "react-router-dom"

const Post: React.FC<PostProps> = ({ user, img, likes: currentLikes, content, id, date, isLiked: isAlreadyLiked }) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([])
  const [isLiked, setIsLiked] = useState<boolean>(isAlreadyLiked)
  const [likes, setLikes] = useState<number>(currentLikes)
  const { user: currentUser } = useUser()
  const navigate = useNavigate()

  const toggleComments = async () => {
    setIsCommentsOpen(!isCommentsOpen)
    if (!isCommentsOpen && comments.length === 0) {
      try {
        const response = await getRecords<Comment[]>(`app/comment/${id}`)
        setComments(response)
      } catch (error) {
        console.error("Failed to fetch comments:", error)
      }
    }
  }

  const handleLike = async () => {
    try {
      await createRecord<{ post_id: number; dir: number }, { message: string }>("app/like/", {
        post_id: id,
        dir: isLiked ? 0 : 1,
      })
      setLikes(isLiked ? likes - 1 : likes + 1)
      setIsLiked(!isLiked)
    } catch (error) {
      console.error("Failed to like/unlike post:", error)
    }
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      try {
        const response = await createRecord<{ post_id: number; content: string }, Comment>("/app/comment/", {
          post_id: id,
          content: newComment,
        })
        setComments([response, ...comments])
        setNewComment("")
      } catch (error) {
        console.error("Failed to submit comment:", error)
      }
    }
  }

  const handleUserClick = () => {
    navigate(`/user/${user.id}`)
  }

  return (
    <article className="max-w-[500px] w-full bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-purple-100">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <img
            src={user.img.src || "/placeholder.svg"}
            alt={user.img.alt}
            className="w-12 h-12 rounded-full object-cover border-2 border-purple-200 shadow-sm cursor-pointer hover:border-purple-400 transition-colors duration-300"
            onClick={handleUserClick}
          />
          <div>
            <p
              className="font-bold text-gray-900 text-sm cursor-pointer hover:text-purple-600 transition-colors duration-300"
              onClick={handleUserClick}
            >
              @{user.user}
            </p>
            <p className="text-xs text-gray-500 mt-1">{dateFormat(date)}</p>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden group max-w-[500px] max-h-[500px]">
        <img
          src={img.src || "/placeholder.svg"}
          alt={img.alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-6">
            <button
              className="flex items-center space-x-2 text-gray-500 hover:text-purple-500 transition-colors duration-200"
              onClick={handleLike}
            >
              <Heart size={22} className={`${isLiked ? "text-purple-500 fill-purple-500" : "text-gray-500"}`} />
              <span className={`text-sm font-medium ${isLiked ? "text-purple-500" : "text-gray-500"}`}>{likes}</span>
            </button>
            <button
              onClick={toggleComments}
              className={`flex items-center space-x-2 transition-colors duration-200 ${
                isCommentsOpen ? "text-purple-500" : "text-gray-500 hover:text-purple-500"
              }`}
            >
              <MessageCircle size={22} />
              <span className="text-sm font-medium">Comments</span>
              <ChevronDown
                size={16}
                className={`transform transition-transform duration-300 ${isCommentsOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>
        <p className="text-gray-800 text-sm leading-relaxed">{content}</p>
      </div>

      {comments && (
        <div
          className={`bg-purple-50 overflow-hidden transition-all duration-300 ease-in-out ${
            isCommentsOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-6">
            <form onSubmit={handleSubmitComment} className="mb-6 flex items-center">
              <img
                src={currentUser?.image_url || "/placeholder.svg"}
                alt="Current user"
                className="w-8 h-8 rounded-full object-cover mr-2 border border-purple-200"
              />
              <div className="flex-grow relative">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full p-2 pr-10 text-gray-800 border border-purple-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-purple-600 transition-colors duration-200"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
            <div className="space-y-4 max-h-60 overflow-y-auto">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <img
                    src={comment.user.image_url || "/placeholder.svg"}
                    alt={`@${comment.user.username}`}
                    onClick={() => navigate(`/user/${comment.user.id}`)}
                    className="w-8 h-8 rounded-full object-cover cursor-pointer border border-purple-200"
                  />
                  <div className="flex-grow bg-white p-3 rounded-lg shadow-sm border border-purple-100">
                    <div className="flex items-center justify-between mb-1">
                      <p
                        className="font-semibold text-sm text-gray-900 cursor-pointer hover:text-purple-600 transition-colors duration-300"
                        onClick={() => navigate(`/user/${comment.user.id}`)}
                      >
                        @{comment.user.username}
                      </p>
                      <p className="text-xs text-gray-500">{dateFormat(comment.created_at)}</p>
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

export default Post

