import { useRef, useState } from "react";
import Footer from "./Footer";
import ImagePreview from "./ImagePreview";
import ImageUpload from "./ImageUpload";
import { enhancedImageAPI } from "../api/enhancedImageApi";

const Home = () => {
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  const handleDownload = () => {
    if (!enhancedImage || !downloadLinkRef.current) return;

    // Configure the download link
    downloadLinkRef.current.href = enhancedImage;
    downloadLinkRef.current.download = `enhanced-${Date.now()}.jpg`;
    downloadLinkRef.current.click();
  };

  //^ async fun which get image file and change into url and then api call
  const UploadImageHandler = async (file: File) => {
    // console.log(file);          // but we can't save file , we save in Obj URL form that represent image file
    // console.log(URL.createObjectURL(file)); //  here we convert file into link form,  now image get in link form
    setUploadImage(URL.createObjectURL(file));
    setLoading(true);

    //call the Api to enhance the image
    try {
      const enhancedData = await enhancedImageAPI(file); //api fun call(pass url image file)
      setEnhancedImage(enhancedData?.image || null);
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Error while enhancing the image. Please try again later.");
      setLoading(false);
    }
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

        {/* Hidden download link */}
        <a ref={downloadLinkRef} className="hidden" aria-hidden="true" />

        {/* Download button - only shows when enhanced image is available */}
        {enhancedImage && (
          <button
            onClick={handleDownload}
            disabled={loading}
            className={`mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing..." : "Download Enhanced Image"}
          </button>
        )}

        <Footer />
      </div>
    </>
  );
};

export default Home;
