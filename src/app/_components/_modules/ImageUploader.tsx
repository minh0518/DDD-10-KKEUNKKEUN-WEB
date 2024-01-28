'use client';

import { ChangeEvent, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  _classname?: string;
  _handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploader = ({ _classname, _handleFileChange, ...rest }: Props) => {
  return (
    <>
      <form className={_classname} encType="multipart/form-data">
        <label htmlFor="file">이미지업로드</label>
        <input
          type="file"
          id="file"
          accept="image/jpg, image/jpeg, image/png"
          onChange={_handleFileChange}
          multiple
          {...rest}
        />
      </form>
    </>
  );
};

export default ImageUploader;
