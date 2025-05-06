const uploadToCloudinary = async (base64Image: string): Promise<string> => {
  const formData = new FormData();
  formData.append("file", base64Image);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  );

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  formData.append("cloud_name", cloudName);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  return data.secure_url;
};

export default uploadToCloudinary;
