import { getRecords } from "@/api/requests";
import { User } from "@/types/user";
import { useState, useEffect } from "react";

const useUser = () => {
  const [user, setUser] = useState<User>();
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return sessionStorage.getItem("access_token");
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);

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
    setAccessToken(null);
  }

  const getUserProfile = async () => {
    if (!accessToken || isLoading) return;
    
    try {
      setIsLoading(true);
      const response = await getRecords<User>('app/user')
      setUser(response);
      setIsFetched(true);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch user data if we have an accessToken and haven't loaded the user yet
    if (!isFetched) {
      getUserProfile();
    }
  }, [accessToken]); // Only react to accessToken changes

  return {
    handleSetAccessToken,
    accessToken,
    getUserProfile,
    user,
    handleGetAccessToken,
    handleLogout,
    isLoading
  };
};

export default useUser;