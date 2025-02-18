import styles from "./searchbar.module.scss";

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value.trim();
    if (username) {
      onSearch(username);
    }
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Enter a GitHub username to explore repositories"
        className={styles.searchForm__input}
        required
      />
      <button type="submit" className={styles.searchForm__button}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
