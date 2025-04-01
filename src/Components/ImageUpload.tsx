import { ChangeEvent } from "react";

interface ImageUploadProps {
  UploadImageHandler: (file: File) => void;
}

const ImageUpload = ({ UploadImageHandler }: ImageUploadProps) => {
  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files);
    const file = e.target.files?.[0]; // Optional Chaining (safer file access)

    if (file) {
      UploadImageHandler(file); // fun call where file pass
    }
  };
  return (
    <div className="bg-slate-100 p-6 md:w-[600px] text-center">
      <label
        htmlFor="fileInput"
        className="block border-2 bg-slate-300 p-8 border-slate-400 border-dashed rounded-lg cursor-pointer hover:border-slate-500 transition-all"
      >
        <span className="text-lg font-medium text-gray-400">
          Click and Drag to upload your image
        </span>
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleUploadImage}
          accept="image/*" // Optional: restrict to image files only
        />
      </label>
    </div>
  );
};

export default ImageUpload;
