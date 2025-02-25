import { getRecords } from "@/api/requests"
import { SearchProps } from "@/types/search"
import { useState } from "react"
import { Search } from "lucide-react"

const SearchInput = <T,>({ type, setResults, setIsLoading }: SearchProps<T>) => {
  const [searchQuery, setSearchQuery] = useState("")

  const search = async () => {
    setIsLoading(true)
    try {
      const responseJson = await getRecords<T[]>(
        `app/${type}${type === "users" ? "/search" : ""}?search=${searchQuery}`,
      )
      setResults(responseJson)
      setIsLoading(false)
    } catch (error) {
      console.error("Search failed:", error)
    }
  }

  return (
    <div className="w-full">
      <div className="relative w-full max-w-md mx-auto">
        <input
          placeholder={`Search ${type}...`}
          className="w-full px-4 py-2 pl-10 bg-white border border-purple-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm text-gray-700 placeholder-gray-400 shadow-sm transition-all duration-300 ease-in-out"
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search()
            }
          }}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-purple-400" />
        </div>
        <button
          onClick={search}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-purple-500 hover:text-purple-600 transition-colors duration-300"
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default SearchInput

