import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, Upload, X } from "lucide-react"
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
      navigate("/home");
    } catch (error) {
      alert("An error occurred while creating the post.");
    }
  };
  

  return (
    <div className="min-h-screen mx-auto w-full md:min-w-[40%] sm:min-w-[70%] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Create a post</h1>
          </div>

          <div className="space-y-6 max-w-[400px] mx-auto">
            <div className="w-full aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
              {selectedFile ? (
                <div className="relative w-full h-full">
                  <img
                    src={URL.createObjectURL(selectedFile) || "/placeholder.svg"}
                    alt="Selected"
                    className="object-cover w-full h-full rounded-lg"
                  />
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <X className="h-6 w-6 text-gray-600" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="fileInput"
                  className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                >
                  <Upload className="h-12 w-12 text-gray-400 mb-2" />
                  <span className="text-gray-500 text-sm">Click to upload an image</span>
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
                className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Write a description for your image..."
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between bg-blue-100 rounded-full p-2">
                <span className="text-blue-700 font-medium ml-4">{published ? "Public" : "Private"}</span>
                <button
                  onClick={() => setPublished(!published)}
                  className={`rounded-full p-2 transition-colors duration-200 ${
                    published ? "bg-blue-500 text-white" : "bg-white text-blue-500"
                  }`}
                >
                  {published ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                </button>
              </div>

            <button
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
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

