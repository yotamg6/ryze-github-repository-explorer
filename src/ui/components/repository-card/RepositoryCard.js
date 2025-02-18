import styles from "./repositorycard.module.scss";
const RepositoryCard = ({ repository }) => {
  return (
    <div className={styles.card}>
      <h3>{repository.name}</h3>
      <p className={styles.description}>
        {repository.description || "No description available"}
      </p>
      <div className={styles.stats}>
        <span>⭐ {repository.stargazers_count}</span>
        {repository.language && (
          <span>
            {repository.language === "Python" ? "🐍" : "🔤"}{" "}
            {repository.language}
          </span>
        )}
      </div>
    </div>
  );
};

export default RepositoryCard;
