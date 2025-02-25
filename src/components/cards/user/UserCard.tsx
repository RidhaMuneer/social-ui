import { createRecord } from "@/api/requests"
import { UserCardProps } from "@/types/user"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserPlus, UserMinus } from "lucide-react"

const UserCard: React.FC<UserCardProps> = ({ username, image_url, id }) => {
  const navigate = useNavigate()
  const [isFollowed, setIsFollowed] = useState<boolean>(false)

  const handleFollow = async () => {
    try {
      await createRecord<{ user_id: number; dir: number }, { message: string }>("/app/follow/", {
        user_id: id,
        dir: isFollowed ? 0 : 1,
      })
      setIsFollowed(!isFollowed)
    } catch (error) {
      console.error("Failed to follow/unfollow user:", error)
    }
  }

  return (
    <article className="flex items-center justify-between p-4 bg-white hover:bg-purple-50 transition-colors duration-300 rounded-xl shadow-sm border border-purple-100">
      <div className="flex items-center cursor-pointer group" onClick={() => navigate(`/user/${id}`)}>
        <div className="relative">
          <img
            src={image_url || "/placeholder.svg"}
            alt={username}
            className="w-14 h-14 rounded-full object-cover border-2 border-purple-200 group-hover:border-purple-400 transition-colors duration-300"
          />
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
        <div className="ml-4">
          <p className="text-sm font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
            @{username}
          </p>
          <p className="text-xs text-gray-500">User</p>
        </div>
      </div>
      <button
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${
          isFollowed
            ? "bg-purple-100 text-purple-600 hover:bg-purple-200"
            : "bg-purple-600 text-white hover:bg-purple-700"
        }`}
        onClick={handleFollow}
      >
        {isFollowed ? (
          <>
            <UserMinus size={16} className="mr-2" />
            Unfollow
          </>
        ) : (
          <>
            <UserPlus size={16} className="mr-2" />
            Follow
          </>
        )}
      </button>
    </article>
  )
}

export default UserCard

