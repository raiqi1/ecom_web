import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import SingularSelect from "../../selects/SingularSelect";

export default function ListItem({
  categories,
  SubCategory,
  setSubCategories,
}) {
  console.log(categories);
  const [open, setOpen] = useState(false);
  console.log("open", open);
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const input = useRef(null);

  const handleRemove = async (id) => {
    try {
      const { data } = await axios.delete("/api/admin/subCategory", {
        data: { id },
      });
      setSubCategories(data.subCategories);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const { data } = await axios.put("/api/admin/subCategory", {
        id,
        name: name || SubCategory.name,
        parent:parent || SubCategory.name
      });
      setSubCategories(data.subCategories);
      setOpen(false);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <li className={styles.list__item}>
      <input
        className={open ? styles.open : ""}
        type="text"
        value={name ? name : SubCategory.name}
        onChange={(e) => setName(e.target.value)}
        disabled={!open}
        ref={input}
      />
      {/* <SingularSelect
        name="parent"
        data={categories}
        placeholder="Select Parent Category"
        value={parent ? parent : SubCategory.parent.name}
        handleChange={(e) => setParent(e.target.value)}
      /> */}
      {open && (
        <div className={styles.list__item_expand}>
          <select
            name="parent"
            value={parent || SubCategory.parent._id}
            onChange={(e) => setParent(e.target.value)}
            disabled={!open}
            className={styles.select}
          >
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
          <button
            className={styles.btn}
            onClick={() => handleUpdate(SubCategory._id)}
          >
            Save
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              setOpen(false);
              setName("");
              setParent("");
            }}
          >
            Cancel
          </button>
        </div>
      )}
      <div className={styles.list__item_actions}>
        {!open && (
          <AiTwotoneEdit
            onClick={() => {
              setOpen((prev) => !prev);
              input.current.focus();
            }}
          />
        )}
        <AiFillDelete onClick={() => handleRemove(SubCategory._id)} />
      </div>
    </li>
  );
}
