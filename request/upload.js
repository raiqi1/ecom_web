import axios from "axios";

export const upload = async (formData) => {
  try {
    const { data } = await axios.post("/api/cloudinary", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
