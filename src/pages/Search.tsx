"use client"

import { useState } from "react"
import UserCard from "@/components/cards/user/UserCard"
import SearchInput from "@/components/search/SearchInput"
import type { User } from "@/types/user"

const Search = () => {
  const [results, setResults] = useState<User[]>()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <section className="min-h-screen flex flex-col items-center w-full max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-purple-800 mb-6">Search Users</h1>
      <SearchInput type="users" setResults={setResults} setIsLoading={setIsLoading} />
      <div className="mt-6 w-full space-y-4">
        {isLoading ? (
          [...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse flex items-center p-4 bg-white rounded-xl shadow-sm">
              <div className="rounded-full bg-purple-200 h-14 w-14"></div>
              <div className="ml-4 flex-1">
                <div className="h-4 bg-purple-200 rounded w-3/4"></div>
                <div className="h-3 bg-purple-100 rounded w-1/2 mt-2"></div>
              </div>
              <div className="h-8 bg-purple-200 rounded-full w-24"></div>
            </div>
          ))
        ) : results && results.length > 0 ? (
          results.map((user) => (
            <UserCard key={user.id} image_url={user.image_url} username={user.username} id={user.id} />
          ))
        ) : results && results.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-xl font-semibold">No users found</p>
            <p className="mt-2">Try a different search term</p>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-xl font-semibold">Start your search</p>
            <p className="mt-2">Find users by typing in the search box above</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Search

