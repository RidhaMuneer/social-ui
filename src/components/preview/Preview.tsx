// hooks
import useScreenWidthMatch from "@/hooks/screenWidth/useScreenWidth";
import useUser from "@/hooks/user/useUser";
import { useNavigate } from "react-router-dom";

// components
import Suggestions from "@/components/suggestions/Suggestions";

const Preview = () => {
  const { user } = useUser();
  const isLg = useScreenWidthMatch(1250);
  const navigate = useNavigate();
  return (
    <>
      {isLg && user ? (
        <aside className="flex flex-col items-start justify-start h-screen bg-background fixed top-0 right-0 mx-14 my-20 gap-7">
          <article className="flex gap-4 justify-start items-center py-3 cursor-pointer">
            <img
              src={user.image_url}
              alt={user.username}
              className="w-10 h-10 rounded-full border border-neutral-500"
            />
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          </article>
          {/* <Suggestions /> */}
        </aside>
      ) : (
        <>
          {isLg && (
            <aside className="flex flex-col items-center justify-start h-screen bg-background fixed top-0 right-0 mx-10 my-20 gap-7">
              <button
                className="border py-2 rounded hover:bg-white hover:text-black transition delay-100 px-10 mx-10"
                onClick={() => navigate("/auth/login")}
              >
                Login
              </button>
            </aside>
          )}
        </>
      )}
    </>
  );
};

export default Preview;
