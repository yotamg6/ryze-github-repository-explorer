import styles from "./repositorygrid.module.scss";
import RepositoryCard from "../repository-card/RepositoryCard";
const RepositoryGrid = ({ repositories }) => {
  return (
    <div className={styles.grid}>
      {repositories.map((repo) => (
        <RepositoryCard key={repo.id} repository={repo} />
      ))}
    </div>
  );
};

export default RepositoryGrid;
