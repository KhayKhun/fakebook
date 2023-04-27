import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    await axios({
        method : 'post',
        url : 'http://localhost:3001/upload-image',
        data : formData,
        headers :{ 'Content-Type': 'multipart/form-data' },
        withCredentials : true,
      }).then(response => {
            alert('Image uploaded successfully')
            window.location.reload();
      }).catch(error => {
        console.error(error);
        alert('Failed to upload image');
      })
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full justify-between items-center">
    <input id="file-upload" type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} 
      className="text-sm h-full"
    />
    <button type="submit" className='normal-button-ratio bg-[#1877f2] text-white'>Upload</button>
  </form>
  
  );
};

export default UploadImage;
