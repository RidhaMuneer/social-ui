import { User } from "@/types/user";
import { useState, useEffect } from "react";

const useUser = () => {
  const [user, setUser] = useState<User>();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const handleSetAccessToken = (token: string) => {
    sessionStorage.setItem("access_token", token);
    setAccessToken(token);
  };

  const handleGetAccessToken = () => {
    return sessionStorage.getItem("access_token");
  }

  const getUserProfile = async (id?: number) => {
    if (id) {
      const response = await fetch(`http://127.0.0.1:8000/app/user/${id}`);
      if (response.ok) {
        return await response.json();
      }
    } else {
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${handleGetAccessToken()}`);
      const response = await fetch("http://127.0.0.1:8000/app/user", {
        headers: headers,
      });
      if (response.ok) {
        setUser(await response.json());
      }
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [accessToken]);

  return {
    handleSetAccessToken,
    accessToken,
    getUserProfile,
    user,
    handleGetAccessToken
  };
};

export default useUser;
