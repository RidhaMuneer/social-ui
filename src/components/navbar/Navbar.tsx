// hooks
import useScreenWidthMatch from "@/hooks/screenWidth/useScreenWidth";

// icons
import HomeIcon from "@/icons/HomeIcon";
import InboxIcon from "@/icons/InboxIcon";
import PlusIcon from "@/icons/PlusIcon";
import SearchIcon from "@/icons/SearchIcon";
import SettingsIcon from "@/icons/SettingsIcon";

// React
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const isMd = useScreenWidthMatch(635);
  const navigate = useNavigate();
  return (
    <section>
      {isMd ? (
        <div className="flex flex-col items-center justify-center h-screen bg-background fixed top-0 left-0">
          <nav className="bg-card rounded-lg shadow-lg py-4 px-2 flex flex-col items-center justify-between gap-4 h-screen">
            <div className="flex flex-col items-center justify-center gap-4">
              <button
                className="flex flex-col items-center justify-center gap-1 text-card-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                onClick={() => navigate("/home")}
              >
                <HomeIcon className="w-6 h-6" />
                <span className="text-sm font-medium">Home</span>
              </button>
              <button
                className="flex flex-col items-center justify-center gap-1 text-card-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                onClick={() => navigate("/search")}
              >
                <SearchIcon className="w-6 h-6" />
                <span className="text-sm font-medium">Search</span>
              </button>
              <button
                className="flex flex-col items-center justify-center gap-1 text-card-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                onClick={() => navigate("/post")}
              >
                <PlusIcon className="w-6 h-6" />
                <span className="text-sm font-medium">Post</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-1 text-card-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <InboxIcon className="w-6 h-6" />
                <span className="text-sm font-medium">Chat</span>
              </button>
            </div>
            <button className="flex flex-col items-center justify-center gap-1 text-card-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
              <SettingsIcon className="w-6 h-6" />
              <span className="text-sm font-medium">Settings</span>
            </button>
          </nav>
        </div>
      ) : (
        <div className="flex justify-center h-[60px] w-full z-10 fixed bottom-0 bg-zinc-900">
          <nav className="bg-card rounded-lg shadow-lg py-4 px-2 flex items-center gap-10 h-[60px]">
            <button
              className="flex flex-col items-center justify-center gap-1 text-card-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              onClick={() => navigate("/home")}
            >
              <HomeIcon className="w-6 h-6" />
              <span className="text-sm font-medium">Home</span>
            </button>
            <button
              className="flex flex-col items-center justify-center gap-1 text-card-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              onClick={() => navigate("/search")}
            >
              <SearchIcon className="w-6 h-6" />
              <span className="text-sm font-medium">Search</span>
            </button>
            <button
              className="flex flex-col items-center justify-center gap-1 text-card-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              onClick={() => navigate("/post")}
            >
              <PlusIcon className="w-6 h-6" />
              <span className="text-sm font-medium">Post</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-1 text-card-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
              <InboxIcon className="w-6 h-6" />
              <span className="text-sm font-medium">Chat</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-1 text-card-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
              <SettingsIcon className="w-6 h-6" />
              <span className="text-sm font-medium">Settings</span>
            </button>
          </nav>
        </div>
      )}
    </section>
  );
};

export default Navbar;
