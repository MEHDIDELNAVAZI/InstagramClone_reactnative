// ImageUploadContext.js

import React, { createContext, useContext, useState } from "react";

// Create a context
const ImageUploadContext = createContext();
export const useImageUpload = () => useContext(ImageUploadContext);
export const ImageUploadProvider = ({ children }) => {
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  return (
    <ImageUploadContext.Provider
      value={{
        isImageUploaded,
        setIsImageUploaded,
      }}
    >
      {children}
    </ImageUploadContext.Provider>
  );
};
