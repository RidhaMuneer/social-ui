import { getRecords } from "@/api/requests";
import { SearchProps } from "@/types/search";
import { useState } from "react";

const SearchInput = <T,>({ type, setResults }: SearchProps<T>) => {
  const [searchQuery, setSearchQuery] = useState("")

  const search = async () => {
    try {
      const responseJson = await getRecords<T[]>(
        `app/${type}${type === "users" ? "/search" : ""}?search=${searchQuery}`,
      )
      setResults(responseJson)
    } catch (error) {
      console.error("Search failed:", error)
    }
  }

  return (
    <div className="w-full">
      <div className="relative w-full max-w-md mx-auto">
        <input
          placeholder={`Search ${type}...`}
          className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm"
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search()
            }
          }}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default SearchInput


