// components
import UserCard from "@/components/cards/user/UserCard";
import SearchInput from "@/components/search/SearchInput";

// types
import { User } from "@/types/user";

// react
import { useState } from "react";

const Search = () => {
  const [results, setResults] = useState<User[]>();
  return (
    <section className="min-h-screen flex flex-col justify-start items-center w-full my-10">
      <SearchInput type="users" setResults={setResults}/>
      <div className="mt-14 w-11/12 sm:w-4/12 gap-2 flex flex-col">
        {results?.map((user) => (
          <UserCard key={user.id} image_url={user.image_url} username={user.username}/>
        ))}
      </div>
    </section>
  );
};

export default Search;
