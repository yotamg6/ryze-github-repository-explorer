"use client";

import { useState } from "react";
import SearchBar from "@/ui/components/search-bar/SearchBar";
import RepositoryGrid from "@/ui/components/repository-grid/RepositoryGrid";
import SortButton from "@/ui/components/sort-button/SortButton";
import styles from "./page.module.scss";

const Home = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");

  const handleSearch = async (searchUsername) => {
    setLoading(true);
    setError(null);
    setUsername(searchUsername);

    try {
      const response = await fetch(
        `/api/github/repos?username=${searchUsername}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch repositories");
      }
      const data = await response.json();
      setRepositories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = () => {
    const sortedRepos = [...repositories].sort(
      (a, b) => b.stargazers_count - a.stargazers_count
    );
    setRepositories(sortedRepos);
  };

  return (
    <main className={styles.main}>
      <h1>🔍 GitHub Repository Explorer</h1>
      <SearchBar onSearch={handleSearch} />

      {error && <p className={styles.error}>{error}</p>}
      {loading && <p className={styles.loading}>Loading...</p>}

      {repositories.length > 0 && (
        <>
          <div className={styles.resultHeader}>
            <h2>Repositories for {username}</h2>
            <SortButton onClick={handleSort} />
          </div>
          <RepositoryGrid repositories={repositories} />
        </>
      )}
    </main>
  );
};

export default Home;

// src/app/page.module.scss
