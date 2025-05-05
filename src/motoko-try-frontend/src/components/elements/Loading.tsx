const Loading = () => {
  return (
    <div
      className="inset-0 bg-gray-800/10 fixed flex w-full h-full items-center justify-center duration-300 transition-opacity bg-opacity-60 backdrop-blur-md backdrop-brightness-90"
      style={{ zIndex: 6000 }}
    >
      <div className="flex flex-col items-center gap-[40px] justfiy-center text-center">
        <div className="dot-bricks"></div>
        <p className="text-white ml-2 font-bold text-sm">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
