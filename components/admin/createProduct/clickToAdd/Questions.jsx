import React, { useState } from "react";
import styles from "./styles.module.scss";
import { sizesList } from "../../../../data/sizes";
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";

export default function Questions({ questions, product, setProduct, ...props }) {
  const [ukuran, setUkuran] = useState(false);

  const handleQuestions = (i, e) => {
    const values = [...questions];
    values[i][e.target.name] = e.target.value;
    setProduct({ ...product, questions: values });
  };
  const handleRemove = (i) => {
    if (questions.length > 0) {
      const values = [...questions];
      values.splice(i, 1);
      setProduct({ ...product, questions: values });
    }
  };

  console.log("product questions", product.questions);

  return (
    <div>
      <div className={styles.header}>Questions</div>
      {questions.length === 0 && (
        <BsFillPatchPlusFill
        className={styles.svg}
          onClick={() => {
            setProduct({
              ...product,
              questions: [...questions, { question: "", answer: "" }],
            });
          }}
        />
      )}
      {questions
        ? questions.map((q, i) => (
            <div key={i} className={styles.clicktoadd}>
              <input
                type="text"
                name="question"
                placeholder="Questions"
                value={q.question}
                onChange={(e) => handleQuestions(i, e)}
              />
              <input
                type="text"
                name="anaswer"
                placeholder="Answer"
                value={q.answer}
                onChange={(e) => handleQuestions(i, e)}
              />
              <>
                <BsFillPatchMinusFill onClick={() => handleRemove(i)} />
                <BsFillPatchPlusFill
                  onClick={() => {
                    setProduct({
                      ...product,
                      questions: [...questions, { question: "", answer: "" }],
                    });
                  }}
                />
              </>
            </div>
          ))
        : ""}
    </div>
  );
}
