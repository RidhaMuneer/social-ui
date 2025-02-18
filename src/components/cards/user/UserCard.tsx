import { createRecord } from "@/api/requests"
import { UserCardProps } from "@/types/user"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const UserCard: React.FC<UserCardProps> = ({ username, image_url, id }) => {
  const navigate = useNavigate()
  const [isFollowed, setIsFollowed] = useState<boolean>(false)
  const handleFollow = async () => {
    try {
      await createRecord<{user_id: number, dir: number}, {message: string}>('/app/follow/', {user_id: id, dir: isFollowed ? 0 : 1})
      setIsFollowed(!isFollowed);
    } catch (error) {
      
    }
  }
  return (
    <article className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition-colors duration-200 rounded-lg">
      <div className="flex items-center cursor-pointer" onClick={() => navigate(`/user/${id}`)}>
        <img
          src={image_url || "/placeholder.svg"}
          alt={username}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <p className="text-sm font-semibold text-gray-900">@{username}</p>
          <p className="text-xs text-gray-500">User</p>
        </div>
      </div>
      <button className={`px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors duration-200 ${isFollowed && 'bg-gray-400'}`} onClick={handleFollow}>
        {isFollowed ? 'Followed' : 'Follow'}
      </button>
    </article>
  )
}

export default UserCard
