import styles from "./repositorycard.module.scss";
import { useRouter } from "next/navigation";

const RepositoryCard = ({ repository }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/repo/${repository.owner.login}/${repository.name}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
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
