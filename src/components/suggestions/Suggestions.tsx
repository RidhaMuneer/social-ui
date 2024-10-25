// hooks
import useUser from "@/hooks/user/useUser";
import { useEffect, useState } from "react";

// types
import { UsersSuggestions } from "@/types/user";
import FollowButton from "../button/FollowButton";

const Suggestions = () => {
  const { user, handleGetAccessToken } = useUser();
  const [suggestions, setSuggestions] = useState<UsersSuggestions[]>();

  useEffect(() => {
    const fetchSuggestions = async () => {
      const header = new Headers();
      header.append("Authorization", `Bearer ${handleGetAccessToken()}`);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL_PROD}/app/users/suggestions`,
        {
          method: "GET",
          headers: header,
        },
      );
      if (response.ok) {
        setSuggestions(await response.json());
      }
    };
    fetchSuggestions();
  }, []);
  return (
    <section>
      {user && (
        <div className="flex flex-col items-start justify-start gap-3">
          <h1>Suggestions</h1>
          {suggestions!.map((suggestion) => (
            <div className="flex gap-5 items-center justify-between w-full">
              <div className="flex gap-3 items-center">
                <img
                  src={suggestion.image_url}
                  alt={suggestion.username}
                  className="w-10 h-10 rounded-full border border-neutral-500"
                />
                <p className="text-sm text-muted-foreground">
                  @{suggestion.username}
                </p>
              </div>
              <FollowButton id={suggestion.id}/>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Suggestions;
