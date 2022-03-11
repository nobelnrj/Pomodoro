/** @format */

import React from "react";
import styles from "../../assets/css/components/animatedBook.module.css";

function AnimatedBook(props) {
  return (
    <div className={styles.animatedBook}>
      <div className={styles.back}></div>
      <div className={styles.page6}>{props.formElement}</div>
      <div className={styles.page5}></div>
      <div className={styles.page4}></div>
      <div className={styles.page3}></div>
      <div className={styles.page2}></div>
      <div className={styles.page1}></div>
      <div className={styles.front}>
        <h1 className={styles.bookTitle}>{props.title}</h1>
      </div>
    </div>
  );
}

export default AnimatedBook;
