'use client';

import { ChangeEvent, useState } from 'react';

const useImageUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [base64Strings, setBase64Strings] = useState<string[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;

    if (files) Array.from(files).forEach((file) => readAndDisplayFile(file));
  };

  const readAndDisplayFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64String = e.target?.result;
      if (base64String && typeof base64String === 'string') {
        setBase64Strings((prevBase64Strings) => [...prevBase64Strings, base64String]);
      }
    };

    reader.readAsDataURL(file);
    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, file]);
  };

  return { selectedFiles, base64Strings, handleFileChange };
};

export default useImageUploader;
