"use client";
import { useState } from "react";
import styles from "./searchbar.module.scss";

const SearchBar = ({ handleSearch }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleSearch(input.trim());
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Enter GitHub username"
      />
      <button type="submit" className={styles.searchForm__button}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
