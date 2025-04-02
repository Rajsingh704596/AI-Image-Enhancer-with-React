import { FC } from "react";
import Loading from "./Loading";

interface PropType {
  loading: boolean;
  uploaded: string | null;
  enhanced: string | null;
}

const ImagePreview: FC<PropType> = ({ loading, uploaded, enhanced }) => {
  return (
    <div className="mt-5">
      <h2 className="text-center text-2xl font-semibold m-10 px-6 py-1 border-1 rounded-3xl bg-red-500">
        Image Preview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5 w-full max-w-4xl">
        {/* Original Image */}
        <div className="bg-white text-black w-full text-center shadow-lg rounded-xl overflow-hidden md:w-[400px]">
          <h2 className="text-xl font-semibold py-2 bg-blue-300">
            {" "}
            Original Image
          </h2>
          {uploaded ? (
            <img
              src={uploaded}
              alt="Original image"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-60 bg-gray-200 text-slate-500">
              No Image Selected
            </div>
          )}
        </div>

        {/* Enhanced Image */}
        <div className="bg-white text-black w-full text-center shadow-lg rounded-xl overflow-hidden">
          <h2 className="text-xl font-semibold py-2 bg-blue-300">
            {" "}
            Enhanced Image
          </h2>
          {/* if enhanced image get then show */}
          {enhanced && !loading && (
            <img
              src={enhanced}
              alt="Enhanced image"
              className="w-full h-full object-cover"
            />
          )}
          {/* loading true then Loading component show */}
          {loading ? (
            <Loading />
          ) : (
            <div className="flex items-center justify-center h-60 bg-gray-200 text-slate-500">
              No Enhanced Image
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
