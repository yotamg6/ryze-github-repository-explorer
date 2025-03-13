import styles from "./sortbutton.module.scss";

const SortButton = ({ handleSort, sortDirection }) => {
  return (
    <button className={styles.SortButton} onClick={handleSort}>
      Sort by Stars ({sortDirection})
    </button>
  );
};

export default SortButton;
