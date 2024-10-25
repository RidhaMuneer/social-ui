import { SearchProps } from "@/types/search";
import { useEffect, useState } from "react";

const SearchInput = <T,>({ type, setResults }: SearchProps<T>) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const search = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL_PROD}/app/${type}/${type === "users" ? "search/" : ""}?search=${searchQuery}`,
    );
    if (response.ok) {
      const responseJson = await response.json();
      setResults(responseJson);
    }
  };
  useEffect(() => {
    if (searchQuery.length > 2) {
      search();
    }
  }, [searchQuery]);
  return (
    <input
      placeholder={`Search ${type}...`}
      className="rounded-lg bg-neutral-700 text-muted-foreground px-4 py-2 focus:ring-0 focus:border-0 fixed w-11/12 sm:w-1/2"
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

export default SearchInput;
