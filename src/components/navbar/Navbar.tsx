import useScreenWidthMatch from "@/hooks/screenWidth/useScreenWidth"
import useUser from "@/hooks/user/useUser"
import { Home, Inbox, PlusSquareIcon, Search } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const isMd = useScreenWidthMatch(768)
  const navigate = useNavigate()
  const { user } = useUser()

  const NavButton = ({
    icon: Icon,
    label,
    onClick,
  }: {
    icon: React.ElementType
    label: string
    onClick?: () => void
  }) => (
    <button
      onClick={onClick}
      className="group flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200"
    >
      <Icon className="w-6 h-6 text-gray-600 group-hover:text-purple-600 transition-colors duration-300" />
      {isMd && (
        <span className="text-xs font-medium mt-1 text-gray-600 group-hover:text-purple-600 transition-colors duration-300">
          {label}
        </span>
      )}
    </button>
  )

  return (
    <div className="fixed top-0 left-0 right-0 bg-white z-10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <img className="h-14 w-10 object-cover" src="/logo.png" alt="Logo" />
          </div>
          <nav className="flex space-x-4">
            <NavButton icon={Home} label="Home" onClick={() => navigate("/")} />
            <NavButton icon={Search} label="Search" onClick={() => navigate("/search")} />
            <NavButton icon={PlusSquareIcon} label="Post" onClick={() => navigate("/post")} />
            <NavButton icon={Inbox} label="Chat" onClick={() => navigate("/chat")} />
          </nav>
          <div className="flex items-center">
            <img
              src={user?.image_url || "/placeholder.svg"}
              alt={user?.username || "User"}
              className="w-10 h-10 rounded-full cursor-pointer object-cover border-2 border-purple-200 hover:border-purple-400 transition-colors duration-300"
              onClick={() => navigate(`/user/${user?.id}`)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar

