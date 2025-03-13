"use client";
import RepositoryGrid from "@/ui/components/repository-grid/RepositoryGrid";
import SortButton from "@/ui/components/sort-button/SortButton";
import styles from "./results-section.module.scss";

const ResultsSection = ({
  username,
  repositories,
  handleSort,
  sortDirection,
}) => {
  return (
    <>
      <div className={styles.resultHeader}>
        <h2>Repositories for {username}</h2>
        <SortButton handleSort={handleSort} sortDirection={sortDirection} />
      </div>
      <RepositoryGrid repositories={repositories} />
    </>
  );
};

export default ResultsSection;
