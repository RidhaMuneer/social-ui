// components
import UserCard from "@/components/cards/user/UserCard";
import SearchInput from "@/components/search/SearchInput";

// types
import { User } from "@/types/user";

// react
import { useState } from "react";

const Search = () => {
  const [results, setResults] = useState<User[]>()
  return (
    <section className="min-h-screen flex flex-col items-center w-full max-w-md mx-auto px-4 py-6">
      <SearchInput type="users" setResults={setResults} />
      <div className="mt-6 w-full">
        {results?.map((user) => (
          <UserCard key={user.id} image_url={user.image_url} username={user.username} id={user.id}/>
        ))}
      </div>
    </section>
  )
}

export default Search
