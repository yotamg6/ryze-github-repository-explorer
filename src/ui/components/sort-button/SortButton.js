import styles from "./sortbutton.module.scss";

const SortButton = ({ onClick }) => {
  return (
    <button className={styles.SortButton} onClick={onClick}>
      Sort by Stars (Descending)
    </button>
  );
};

export default SortButton;
