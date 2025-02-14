"use client"

import type React from "react"
import { useState } from "react"
import { Heart, MessageCircle, Send, ChevronDown } from "lucide-react"

// types
import type { PostProps } from "@/types/post"

// utils
import { dateFormat } from "@/utils/dateFormat"

interface Comment {
  id: string
  user: string
  userImage: string
  content: string
  date: Date
}

const Post: React.FC<PostProps> = ({ user, img, likes, content, id, date, isLiked }) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: "alice",
      userImage: "/placeholder.svg?height=40&width=40",
      content: "Great post!",
      date: new Date(),
    },
    {
      id: "2",
      user: "bob",
      userImage: "/placeholder.svg?height=40&width=40",
      content: "I love this!",
      date: new Date(),
    },
  ])

  const toggleComments = () => setIsCommentsOpen(!isCommentsOpen)

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      setComments([
        {
          id: Date.now().toString(),
          user: "currentUser",
          userImage: "/placeholder.svg?height=40&width=40",
          content: newComment,
          date: new Date(),
        },
        ...comments,
      ])
      setNewComment("")
    }
  }

  return (
    <article className="max-w-[500px] w-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={user.img.src || "/placeholder.svg"}
              alt={user.img.alt}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 shadow-sm"
            />
            <div>
              <p className="font-bold text-gray-900 text-sm">@{user.user}</p>
              <p className="text-xs text-gray-500 mt-1">{dateFormat(date)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative group">
        <img
          src={img.src || "/placeholder.svg"}
          alt={img.alt}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-6">
            <button 
              className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors duration-200"
              disabled={isLiked}
            >
              <Heart size={22} className={`${isLiked && 'text-red-500'}`}/>
              <span className={`text-sm font-medium ${isLiked && 'text-red-500'}`}>{likes}</span>
            </button>
            <button
              onClick={toggleComments}
              className={`flex items-center space-x-2 transition-colors duration-200 ${
                isCommentsOpen ? "text-blue-500" : "text-gray-500 hover:text-blue-500"
              }`}
            >
              <MessageCircle size={22} />
              <span className="text-sm font-medium">Comments</span>
              <ChevronDown
                size={16}
                className={`transform transition-transform duration-300 ${isCommentsOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>
        <p className="text-gray-800 text-sm leading-relaxed">{content}</p>
      </div>

      <div
        className={`bg-gray-50 overflow-hidden transition-all duration-300 ease-in-out ${
          isCommentsOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6">
          <form onSubmit={handleSubmitComment} className="mb-6 flex items-center">
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="Current user"
              className="w-8 h-8 rounded-full object-cover mr-2"
            />
            <div className="flex-grow relative">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-2 pr-10 text-black border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600 transition-colors duration-200"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
          <div className="space-y-4 max-h-60 overflow-y-auto">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <img
                  src={comment.userImage || "/placeholder.svg"}
                  alt={`@${comment.user}`}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-grow bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-sm text-gray-900">@{comment.user}</p>
                    <p className="text-xs text-gray-500">{dateFormat(comment.date.toDateString())}</p>
                  </div>
                  <p className="text-sm text-gray-700">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

export default Post

