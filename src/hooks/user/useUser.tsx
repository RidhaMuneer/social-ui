import { getRecords } from "@/api/requests";
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

  const isLoggedIn = () => {
    return !!sessionStorage.getItem("access_token");
  }

  const getUserProfile = async () => {
    try {
      const response = await getRecords<User>('app/user')
      setUser(response);
    } catch (error) {
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return {
    handleSetAccessToken,
    accessToken,
    getUserProfile,
    user,
    handleGetAccessToken,
    handleLogout,
    isLoggedIn
  };
};

export default useUser;
