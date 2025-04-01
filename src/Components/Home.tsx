import { useState } from "react";
import Footer from "./Footer";
import ImagePreview from "./ImagePreview";
import ImageUpload from "./ImageUpload";

const Home = () => {
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const UploadImageHandler = (file: File) => {
    // console.log(file);          // but we can't save file , we save in Obj form that represent image file
    // console.log(URL.createObjectURL(file)); // now image get in link form , here we convert file into link form
    setUploadImage(URL.createObjectURL(file));
    setLoading(true);

    //call the Api to enhance the image
  };
  return (
    <>
      <div className="bg-linear-to-r from-slate-700 via-slate-800 to-slate-700 text-white min-h-screen flex flex-col justify-center items-center p-10">
        <h1 className="text-4xl mb-8 font-bold  text-blue-400">
          AI Image Enhancer
        </h1>

        <ImageUpload UploadImageHandler={UploadImageHandler} />

        <ImagePreview
          loading={loading}
          uploaded={uploadImage}
          enhanced={enhancedImage}
        />

        <Footer />
      </div>
    </>
  );
};

export default Home;
