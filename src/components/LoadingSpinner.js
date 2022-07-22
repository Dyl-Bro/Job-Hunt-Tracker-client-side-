import React from "react";

function LoadingSpinner() {
  return (
    <div>
      <div className="w-16 h-16 xl:h-48 xl:w-48 border-8 border-y-transparent border-green-400 border-dotted rounded-full animate-spin"></div>
    </div>
  );
}

export default LoadingSpinner;
