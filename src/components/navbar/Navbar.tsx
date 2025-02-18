import useScreenWidthMatch from "@/hooks/screenWidth/useScreenWidth"
import useUser from "@/hooks/user/useUser"
import { Home, Inbox, PlusSquareIcon, Search, Settings } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const isMd = useScreenWidthMatch(768)
  const navigate = useNavigate()
  const { user } = useUser()

  const NavButton = ({
    icon: Icon,
    label,
    onClick,
  }: { icon: React.ElementType; label: string; onClick?: () => void }) => (
    <button
      onClick={onClick}
      className="group flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20"
    >
      <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
      <span className="text-xs font-medium mt-1 text-muted-foreground group-hover:text-primary transition-colors duration-300">
        {label}
      </span>
    </button>
  )

  const DesktopNav = () => (
    <div className="fixed top-0 left-0 h-screen w-20 bg-card/50 backdrop-blur-sm border-r border-border flex flex-col items-center justify-between py-8">
      <nav className="flex flex-col items-center space-y-8">
        <NavButton icon={Home} label="Home" onClick={() => navigate("/home")} />
        <NavButton icon={Search} label="Search" onClick={() => navigate("/search")} />
        <NavButton icon={PlusSquareIcon} label="Post" onClick={() => navigate("/post")} />
        <NavButton icon={Inbox} label="Chat" />
      </nav>
      <div className="flex flex-col items-center space-y-4">
        <NavButton icon={Settings} label="Settings" />
        <img src={user?.image_url} alt={user?.username} className="w-10 h-10 rounded-full cursor-pointer object-cover" />
      </div>
    </div>
  )

  const MobileNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-card/50 z-10 backdrop-blur-sm border-t border-border">
      <nav className="flex justify-around items-center h-16 px-4">
        <NavButton icon={Home} label="Home" onClick={() => navigate("/home")} />
        <NavButton icon={Search} label="Search" onClick={() => navigate("/search")} />
        <NavButton icon={PlusSquareIcon} label="Post" onClick={() => navigate("/post")} />
        <NavButton icon={Inbox} label="Chat" />
        <NavButton icon={Settings} label="Settings" />
        <img src={user?.image_url} alt={user?.username} className="w-10 h-10 rounded-full cursor-pointer object-cover" />
      </nav>
    </div>
  )

  return <>{isMd ? <DesktopNav /> : <MobileNav />}</>
}

export default Navbar

