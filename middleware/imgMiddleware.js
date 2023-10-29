import fs from "fs";

export const imgMiddleware = async (req, res, next) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: "No files were choosen" });
    }
    let files = Object.values(req.files).flat();
    for (const file of files) {
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/webp"
      ) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({
          message: "File type not supported,only JPEG/WEBP/PNG are allowed",
        });
      }
      if (file.size > 1024 * 1024 * 5) {
        removeTmp(file.tempFilePath);
        return res
          .status(400)
          .json({ message: "File size too large, max size is 5MB" });
      }
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
