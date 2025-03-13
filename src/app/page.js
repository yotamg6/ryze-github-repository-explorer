"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import SearchBar from "@/ui/components/search-bar/SearchBar";
import ResultsSection from "@/ui/components/results-section/ResultsSection";
import styles from "./page.module.scss";
import { fetchReposData } from "../lib/api";

const Home = () => {
  const [username, setUsername] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [sortDirection, setSortDirection] = useState("desc");
  const observerRef = useRef(null);

  const handleSearch = (searchUsername) => {
    setPage(1);
    fetchRepositories(searchUsername, true);
  };

  const handleSort = useCallback(() => {
    setRepositories(
      [...repositories].sort((a, b) => {
        return sortDirection === "desc"
          ? b.stargazers_count - a.stargazers_count
          : a.stargazers_count - b.stargazers_count;
      })
    );
    setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"));
  }, [repositories]);

  const fetchRepositories = async (name, reset = false) => {
    if (!name) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchReposData(name, page, 6);
      await new Promise((resolve) => {
        setTimeout(resolve, 300);
      });
      setUsername(name);
      setRepositories((prev) => (reset ? data : [...prev, ...data]));
      setHasMore(data.length > 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (!loading && hasMore && target.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 1,
      }
    );
    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => observer.disconnect();
  }, [loading, repositories, hasMore]);

  useEffect(() => {
    if (page > 1 && hasMore) {
      fetchRepositories(username);
    }
  }, [page, username]);

  return (
    <main className={styles.main}>
      <h1>🔍 GitHub Repository Explorer</h1>
      <SearchBar handleSearch={handleSearch} />

      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.container}>
        <>
          {repositories.length > 0 && (
            <ResultsSection
              username={username}
              repositories={repositories}
              handleSort={handleSort}
              sortDirection={sortDirection}
            />
          )}
        </>
        <div ref={observerRef} className={styles.loader}>
          {loading && <div> Loading more...</div>}
        </div>
      </div>
    </main>
  );
};

export default Home;
