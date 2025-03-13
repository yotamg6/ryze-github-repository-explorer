import styles from "./repositorycard.module.scss";
import Link from "next/link";

const RepositoryCard = ({ repository }) => {
  return (
    <Link
      href={`/repo/${repository.owner.login}/${repository.name}`}
      className={styles.card}
    >
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
    </Link>
  );
};

export default RepositoryCard;
