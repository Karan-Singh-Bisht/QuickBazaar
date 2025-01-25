import React from "react";

const Loading = ({ text = "Loading...", fullScreen = false }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${
        fullScreen
          ? "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
          : "py-5"
      }`}
    >
      <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
      <p className="text-white text-lg font-semibold animate-pulse">{text}</p>
    </div>
  );
};

export default Loading;
