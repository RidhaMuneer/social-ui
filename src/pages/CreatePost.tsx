import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, Upload, X } from 'lucide-react'
import { createRecord } from "@/api/requests"

const CreatePost = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [content, setContent] = useState<string | null>(null)
  const [published, setPublished] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    console.log(file);
    
    if (file) {
      setSelectedFile(file)
    }
  }

  const createPost = async () => {
    if (!content || !selectedFile) {
      alert("Please provide all required fields.");
      return;
    }
  
    const formData = new FormData();
    formData.append("content", content);
    formData.append("published", published ? "true" : "false");
    formData.append("file", selectedFile);
  
    try {
      await createRecord<FormData, { message: string }>("app/posts/", formData);
      navigate("/");
    } catch (error) {
      alert("An error occurred while creating the post.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create a post</h1>
          </div>

          <div className="space-y-6">
            <div className="w-full aspect-square border-2 border-dashed border-purple-300 rounded-xl flex items-center justify-center cursor-pointer hover:bg-purple-50 transition-colors">
              {selectedFile ? (
                <div className="relative w-full h-full">
                  <img
                    src={URL.createObjectURL(selectedFile) || "/placeholder.svg"}
                    alt="Selected"
                    className="object-cover w-full h-full rounded-xl"
                  />
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="fileInput"
                  className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                >
                  <Upload className="h-12 w-12 text-purple-400 mb-2" />
                  <span className="text-purple-500 text-sm font-medium">Click to upload an image</span>
                  <input id="fileInput" type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
                </label>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                className="w-full rounded-xl border border-purple-200 shadow-sm px-4 py-2 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                placeholder="Write a description for your image..."
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between bg-purple-100 rounded-full p-2">
              <span className="text-purple-700 font-medium ml-4">{published ? "Public" : "Private"}</span>
              <button
                onClick={() => setPublished(!published)}
                className={`rounded-full p-2 transition-colors duration-200 ${
                  published ? "bg-purple-500 text-white" : "bg-white text-purple-500"
                }`}
              >
                {published ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
              </button>
            </div>

            <button
              className={`w-full py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors ${
                !content || !selectedFile ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!content || !selectedFile}
              onClick={createPost}
            >
              Create Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
