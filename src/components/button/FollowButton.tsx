// types
import useUser from "@/hooks/user/useUser";
import { FollowButtonProps } from "@/types/user";
import { useState } from "react";

const FollowButton: React.FC<FollowButtonProps> = ({ id }) => {
  const { user, handleGetAccessToken } = useUser();
  const [followed, setFollowed] = useState<boolean>(false);
  const handleFollowCLick = async () => {
    const header = new Headers();
    header.append("Authorization", `Bearer ${handleGetAccessToken()}`);
    header.append("Content-Type", "application/json");
    const response = await fetch(`${import.meta.env.VITE_API_URL_PROD}/app/follow/`, {
      method: "POST",
      headers: header,
      body: JSON.stringify({
        user_id: id,
        dir: 1
      })
    });
    if(response.ok){
      setFollowed(true);
    }
  };
  return (
    <>
      {user && followed == false ? (
        <button
          className="cursor-pointer border border-zinc-600 rounded px-5 py-[1px] font-thin"
          onClick={handleFollowCLick}
        >
          Follow
        </button>
      ) : user && (
        <button
          className="cursor-pointer border border-zinc-600 rounded px-5 py-[1px] font-thin bg-white text-black"
        >
          Following
        </button>
      )}
    </>
  );
};

export default FollowButton;
