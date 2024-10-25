// icons
import ExitIcon from "@/icons/ExitIcon";

// hooks
import useUser from "@/hooks/user/useUser";

// react
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [published, setPublished] = useState<boolean>(false);
  const { handleGetAccessToken } = useUser();
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const createPost = async () => {
    const formData = new FormData();
    formData.append("content", content!);
    formData.append("published", published.toString());
    formData.append("file", selectedFile!);
    const header = new Headers();
    const access_token = handleGetAccessToken();
    header.append("Authorization", `Bearer ${access_token}`);
    const response = await fetch(`${import.meta.env.VITE_API_URL_PROD}/app/posts/`, {
      method: "POST",
      body: formData,
      headers: header
    });
    if (response.ok) {
      navigate("/home");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center w-full min-h-screen gap-5">
      <h1 className="text-4xl">Create a post</h1>
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto space-y-6 p-6">
        <div className="w-full aspect-square border-2 border-dashed border-muted rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted transition">
          {selectedFile ? (
            <div className="relative">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Selected"
                className="object-cover rounded-lg"
              />
              <ExitIcon
                className="absolute top-1 right-1 h-8 w-8 cursor-pointer"
                onClick={() => setSelectedFile(null)}
              />
            </div>
          ) : (
            <label
              htmlFor="fileInput"
              className="text-muted-foreground text-sm flex items-center justify-center w-full h-full cursor-pointer"
            >
              Upload Image
              <input
                id="fileInput"
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}
        </div>
        <div className="w-full space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            rows={3}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Write a description for your image..."
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="flex items-base w-full">
          <input
            type="checkbox"
            className="h-4 w-4 mt-[1px]"
            onChange={(e) => setPublished(e.target.checked)}
          />
          <label htmlFor="publish" className="ml-3 text-sm font-medium">
            Publish Post
          </label>
        </div>
        <button
          className={`w-full border py-2 rounded-lg hover:bg-white hover:text-black transition delay-100 ${
            content === null || selectedFile === null
              ? "cursor-not-allowed"
              : ""
          }`}
          disabled={content === null || selectedFile === null ? true : false}
          onClick={() => createPost()}
        >
          Post
        </button>
      </div>
    </section>
  );
};

export default CreatePost;
