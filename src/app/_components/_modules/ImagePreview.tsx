'use client';

import { useEffect, useState } from 'react';

interface Props {
  selectedFiles: File[];
  base64Strings: string[];
}

const ImagePreview = ({ selectedFiles, base64Strings }: Props) => {
  return (
    <div>
      {selectedFiles.map((file, index) => (
        <div key={index}>
          <p>File Name: {file.name}</p>
          <p>File Size: {file.size} bytes</p>
          <p>Base64 String: {base64Strings[index]}</p>
          <img src={base64Strings[index]} alt="preview" />
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ImagePreview;
