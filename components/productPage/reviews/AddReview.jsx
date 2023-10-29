import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Select from "./Select";
import { Rating } from "@mui/material";
import Images from "./Images";
import { useDispatch } from "react-redux";
import { hideDialog, showDialog } from "../../../store/DialogSlice";
import DialogModal from "../../dialogModal";
import dataURItoBlob from "../../../pages/utils/dataURItoBlob";
import { upload } from "../../../request/upload";
import axios from "axios";
import DotLoaderSpinner from "../../loaders/dotLoader";
import { ClipLoader } from "react-spinners";

export default function AddReview({ product, setReviews }) {
  const [size, setSize] = useState("");
  const [style, setStyle] = useState("");
  const [fit, setFit] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(hideDialog());
  }, []);

  let uploaded_images = [];

  const handleSubmit = async () => {
    setLoading(true);
    let msgs = [];
    if (!size) {
      msgs.push({
        msg: "Please select a size",
        type: "error",
      });
    }
    if (!style) {
      msgs.push({
        msg: "Please select a style",
        type: "error",
      });
    }
    if (!fit) {
      msgs.push({
        msg: "Please select a fit",
        type: "error",
      });
    }
    if (!rating) {
      msgs.push({
        msg: "Please select a rating",
        type: "error",
      });
    }
    if (!review) {
      msgs.push({
        msg: "Please select a review",
        type: "error",
      });
    }
    if (msgs.length > 0) {
      dispatch(
        showDialog({
          header: "Adding review Error",
          msgs,
        })
      );
    } else {
      if (images.length > 0) {
        let temp = images.map((img) => {
          return dataURItoBlob(img);
        });
        const path = "reviews images";
        let formData = new FormData();
        formData.append("path", path);
        temp.forEach((img) => {
          formData.append("file", img);
        });
        uploaded_images = await upload(formData);
        // console.log("uploaded_images",uploaded_images)
      }
      const { data } = await axios.put(`/api/product/${product._id}/review`, {
        size,
        style,
        fit,
        review,
        rating,
        images: uploaded_images,
      });
      setReviews(data.reviews);
      setStyle("");
      setSize("");
      setFit("");
      setImages([]);
      setRating(0);
      setReview("");
    }
    setLoading(false);
  };

  return (
    <div className={styles.reviews__add}>
      <DialogModal />
      <div className={styles.reviews__add_wrap}>
        <div className={`${styles.flex}`} style={{ gap: "10px" }}>
          <Select
            property={size}
            text="Size"
            data={product.allSizes.filter((s) => s.size !== size)}
            handleChange={setSize}
          />
          <Select
            property={style}
            text="Style"
            data={product.colors.filter((s) => s !== style)}
            handleChange={setStyle}
          />
          <Select
            property={fit}
            text="How Does it Fit"
            data={fits.filter((s) => s !== fit)}
            handleChange={setFit}
          />
        </div>
        <Images images={images} setImages={setImages} />
        <textarea
          name="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Add Reviews"
        />
        <Rating
          name="half-rating-read"
          defaultValue={0}
          precision={0.5}
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={{ color: "#f0c14b", fontSize: "3rem" }}
        />
        <button className={styles.login_btn} onClick={() => handleSubmit()}>
          Submit Review
          {loading && <ClipLoader loading={loading} color="#fff" />}
        </button>
      </div>
    </div>
  );
}
let fits = ["Small", "True to Size", "Large"];
