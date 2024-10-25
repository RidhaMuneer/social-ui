import useUser from "@/hooks/user/useUser";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Registration = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [selectedImage, setSelectedImage] = useState<string | null>(
    "/User-avatar.png",
  );
  const [file, setFile] = useState<File>();
  const {handleSetAccessToken} = useUser();

  const onSubmit = async (data: any) => {
    if (!file) {
      setError("any", {
        type: "manual",
        message: "Provide a profile picture",
      });
      return;
    }
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("file", file);

    const response = await fetch(`${import.meta.env.VITE_API_URL_PROD}/app/register`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const responseJson = await response.json();
      handleSetAccessToken(responseJson.access_token);
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const getErrorMessage = (error: any) => {
    if (error && typeof error.message === "string") {
      return error.message;
    }
    return "";
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 w-80"
    >
      <div className="flex items-center justify-center flex-col">
        <label>Choose a profile picture</label>
        <img
          src={selectedImage!}
          alt="Selected"
          className="rounded-full w-12 h-12 mr-4"
          onClick={() => document.getElementById("fileInput")?.click()}
          style={{ cursor: "pointer" }}
        />
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      {errors.file && (
        <p className="text-red-500">{getErrorMessage(errors.file)}</p>
      )}
      <input
        type="text"
        placeholder="Username"
        className="border rounded-lg border-gray-200 p-2"
        {...register("username", { required: "Username is required" })}
      />
      {errors.username && (
        <p className="text-red-500">{getErrorMessage(errors.username)}</p>
      )}

      <input
        type="email"
        placeholder="Email"
        className="border rounded-lg border-gray-200 p-2"
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && (
        <p className="text-red-500">{getErrorMessage(errors.email)}</p>
      )}

      <input
        type="password"
        placeholder="Password"
        className="border rounded-lg border-gray-200 p-2"
        {...register("password", { required: "Password is required" })}
      />
      {errors.password && (
        <p className="text-red-500">{getErrorMessage(errors.password)}</p>
      )}

      {errors.any && (
        <p className="text-red-500">{getErrorMessage(errors.any)}</p>
      )}
      <button
        type="submit"
        className="border rounded-lg bg-gray-700 text-white p-2"
      >
        Register
      </button>
    </form>
  );
};

export default Registration;
