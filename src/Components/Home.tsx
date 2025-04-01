import Footer from "./Footer";
import ImagePreview from "./ImagePreview";
import ImageUpload from "./ImageUpload";

const Home = () => {
  return (
    <>
      <div className="bg-linear-to-r from-slate-700 via-slate-800 to-slate-700 text-white min-h-screen flex flex-col justify-center items-center p-10">
        <h1 className="text-4xl mb-8 font-bold  text-blue-400">
          AI Image Enhancer
        </h1>

        <ImageUpload />

        <ImagePreview />

        <Footer />
      </div>
    </>
  );
};

export default Home;
