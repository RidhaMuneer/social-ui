import { useState, useEffect, useRef } from "react"
import useChat from "@/hooks/useChat"
import useUser from "@/hooks/user/useUser"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Send, Loader2, Share2, X } from "lucide-react"
import { getRecords } from "@/api/requests"
import type { User } from "@/types/user"

const ChatPage = () => {
  const { user } = useUser()
  const userId = user?.id.toString() || "guest"
  const { messages, sendMessage, findMatch, isMatching, isMatched, chatPartner } = useChat(userId)
  const [input, setInput] = useState("")
  const [sharedProfile, setSharedProfile] = useState<User | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const checkForProfileShare = async () => {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage && lastMessage.sender !== "You" && lastMessage.content.startsWith("[id]:")) {
        const sharedUserId = lastMessage.content.split(":")[1].trim()
        try {
          const response = await getRecords<User>(`/app/user/${sharedUserId}`)
          setSharedProfile(response)
        } catch (error) {
          console.error("Error fetching shared profile:", error)
        }
      }
    }

    checkForProfileShare()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      sendMessage(input.trim())
      setInput("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent)
    }
  }

  const getMessageClasses = (sender: string) => {
    if (sender === "You") {
      return {
        container: "flex justify-end",
        bubble: "bg-blue-500 text-white",
      }
    } else if (sender === "System") {
      return {
        container: "flex justify-center",
        bubble: "bg-purple-200 text-purple-800 italic",
      }
    } else {
      return {
        container: "flex justify-start",
        bubble: "bg-gray-200 text-black",
      }
    }
  }

  const handleShareProfile = async () => {
    if (userId !== "guest") {
      sendMessage(`[id]: ${userId}`)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-200"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white flex justify-between items-center">
          <h1 className="text-2xl font-bold">Chat with a Stranger</h1>
          {isMatched && (
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center"
              >
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span>Connected</span>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShareProfile}
                className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-300"
              >
                <Share2 className="h-5 w-5" />
              </motion.button>
            </div>
          )}
        </div>

        {/* Chat messages */}
        <div className="h-[60vh] overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white">
          {messages.length === 0 && !isMatching && !isMatched ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center h-full text-center"
            >
              <p className="text-gray-500 mb-6 text-lg">Welcome to the random chat experience!</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={findMatch}
                className="text-lg px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md"
              >
                <Sparkles className="inline-block mr-2" />
                Find Someone to Chat With
              </motion.button>
            </motion.div>
          ) : isMatching && !isMatched ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center h-full"
            >
              <div className="flex items-center mb-4">
                <Loader2 className="animate-spin text-purple-500 h-8 w-8" />
                <span className="ml-3 text-gray-600 text-lg">Finding your chat companion...</span>
              </div>
              <p className="text-sm text-gray-500">Preparing a magical conversation</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {isMatched && messages.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-6 bg-blue-50 rounded-lg shadow-inner"
                  >
                    <p className="font-medium text-lg text-blue-800">You're now chatting</p>
                    <p className="text-sm text-gray-600 mt-2">Let the magic begin! 🌟</p>
                  </motion.div>
                )}

                {messages.map((msg, index) => {
                  const classes = getMessageClasses(msg.sender)
                  return (
                    <motion.div
                      key={index}
                      className={classes.container}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className={`max-w-xs px-5 py-3 rounded-2xl shadow-md ${classes.bubble}`}>
                        <p className="break-words">{msg.content}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        {isMatched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 border-t border-purple-100"
          >
            <form onSubmit={handleSubmit} className="flex space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your magical message..."
                className="flex-grow px-4 py-3 border border-purple-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                autoFocus
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!input.trim()}
                className={`px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ${
                  input.trim()
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-md"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Send className="h-5 w-5" />
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* Reconnect button when not matched */}
        {!isMatching && !isMatched && messages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 border-t border-purple-100 flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={findMatch}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 shadow-md"
            >
              Find a New Chat Partner
            </motion.button>
          </motion.div>
        )}

        {/* Shared Profile Modal */}
        {sharedProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg p-6 max-w-md w-full relative"
            >
              <button
                onClick={() => setSharedProfile(null)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
              <h2 className="text-2xl font-bold mb-4">User Profile</h2>
              <div className="space-y-2">
                <p>
                  <strong>Username:</strong> {sharedProfile.username}
                </p>
                
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default ChatPage

