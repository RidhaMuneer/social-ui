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

  const handleLogout = () => {
    setUser(undefined);
    sessionStorage.removeItem("access_token");
  }

  const getUserProfile = async (id?: number) => {
    if (id) {
      const response = await fetch(`${import.meta.env.VITE_PUBLIC_API_DEV}/app/user/${id}`);
      if (response.ok) {
        return await response.json();
      }
    } else {
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${handleGetAccessToken()}`);
      const response = await fetch(`${import.meta.env.VITE_PUBLIC_API_DEV}/app/user`, {
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
    handleGetAccessToken,
    handleLogout
  };
};

export default useUser;
