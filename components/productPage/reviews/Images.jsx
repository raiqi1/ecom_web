import React from "react";
import styles from "./styles.module.scss";
import { MdOutlineRemoveCircle } from "react-icons/md";

export default function Images({ images, setImages }) {
  const inputRef = React.useRef(null);
  const [error, setError] = React.useState("");

  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img, i) => {
      if (images.length == 3 || i == 2) {
        setError("You can upload only 3 images");
        return;
      }
      if (img.type !== "image/png" && img.type !== "image/jpeg") {
        setError(`File ${img.name} format is not supported`);
        files = files.filter((f) => f.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024 * 2) {
        setError(`File ${img.name} is too large`);
        files = files.filter((f) => f.name !== img.name);
        return;
      } else {
        setError("");
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = () => {
          setImages((prev) => [...prev, reader.result]);
        };
      }
    });
  };

  const removeImage = (img) => {
    setImages((prev) => prev.filter((i) => i !== img));
    if (images.length <= 3) {
      setError("");
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        hidden
        onChange={handleImages}
        accept="image/png,image/jpeg"
      />
      <button
        className={styles.login_btn}
        style={{ width: "150px" }}
        onClick={() => inputRef.current.click()}
      >
        Add image
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className={styles.imgs_wrap}>
        {images.length > 0 &&
          images.map((img, i) => (
            <span key={i}>
              <MdOutlineRemoveCircle onClick={() => removeImage(img)} />
              <img src={img} alt="" />
            </span>
          ))}
      </div>
    </div>
  );
}
