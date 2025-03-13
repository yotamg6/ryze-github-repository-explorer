"use client";
import styles from "./repositorygrid.module.scss";
import RepositoryCard from "../repository-card/RepositoryCard";
const RepositoryGrid = ({ repositories }) => {
  return (
    <div className={styles.grid}>
      {repositories.map((repo, index) => (
        <RepositoryCard key={index} repository={repo} />
      ))}
    </div>
  );
};

export default RepositoryGrid;
