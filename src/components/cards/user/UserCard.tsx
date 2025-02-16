// types
import { UserCardProps } from "@/types/user";
import { useNavigate } from "react-router-dom";

const UserCard: React.FC<UserCardProps> = ({ username, image_url, id }) => {
  const navigate = useNavigate();
  return (
    <article className="flex items-center px-4 py-2 hover:bg-gray-50 transition-colors duration-200 cursor-pointer" onClick={() => navigate(`/user/${id}`)}>
      <img src={image_url || "/placeholder.svg"} alt={username} className="w-11 h-11 rounded-full object-cover mr-3" />
      <div>
        <p className="text-sm font-semibold text-gray-900">@{username}</p>
      </div>
    </article>
  )
}

export default UserCard
