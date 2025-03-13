"use client";
import Link from "next/link";
import styles from "./repo-page.module.scss";
const RepoDetails = ({ repoData }) => {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← Back to search
      </Link>

      <div className={styles.repoInfo}>
        <h1>{repoData.name}</h1>
        <p className={styles.description}>{repoData.description}</p>

        <div className={styles.stats}>
          <span>⭐ Stars: {repoData.stargazers_count}</span>
          {repoData.language && (
            <span>
              {repoData.language === "Python" ? "🐍" : "🔤"} Language:{" "}
              {repoData.language}
            </span>
          )}
          <span>
            📅 Last Updated:{" "}
            {new Date(repoData.updated_at).toLocaleDateString()}
          </span>
        </div>

        <a
          href={repoData.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.githubLink}
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
};
export default RepoDetails;
