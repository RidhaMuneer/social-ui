import { getRecords } from "@/api/requests";
import { User } from "@/types/user"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export const useGetUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams();

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const response = await getRecords<User>(`/app/user/${id}`);
      setUser(response);
      setIsLoading(false);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchUser();
  }, [id])

  return {
    isLoading,
    user
  }
}