const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center p-35 md:p-20 h-full">
      <span className=" border-3 w-10 h-10 scale-100 rounded-full border-red-200 border-t-transparent animate-spin"></span>
      <span className="font-semibold text-gray-500 mt-2">Loading...</span>
    </div>
  );
};

export default Loading;
