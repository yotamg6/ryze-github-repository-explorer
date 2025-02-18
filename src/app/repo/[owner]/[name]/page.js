// src/app/repo/[owner]/[name]/page.js
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.scss';

const RepoDetails = ({ params }) => {
  const [repoData, setRepoData] = useState(null);
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [repoResponse, contributorsResponse] = await Promise.all([
          fetch(`/api/github/repos?username=${params.owner}&repo=${params.name}`),
          fetch(`/api/github/contributors?username=${params.owner}&repo=${params.name}`)
        ]);

        if (!repoResponse.ok || !contributorsResponse.ok) {
          throw new Error('Failed to fetch repository data');
        }

        const repoData = await repoResponse.json();
        const contributorsData = await contributorsResponse.json();
        
        setRepoData(repoData);
        setContributors(contributorsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.owner, params.name]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!repoData) return <div>Repository not found</div>;

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
              {repoData.language === 'Python' ? '🐍' : '🔤'} Language: {repoData.language}
            </span>
          )}
          <span>
            📅 Last Updated: {new Date(repoData.updated_at).toLocaleDateString()}
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

      <div className={styles.contributors}>
        <h2>Top Contributors</h2>
        <div className={styles.contributorsList}>
          {contributors.map(contributor => (
            <div key={contributor.id} className={styles.contributor}>
              <img 
                src={contributor.avatar_url} 
                alt={contributor.login} 
                className={styles.avatar}
              />
              <div className={styles.contributorInfo}>
                <a 
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contributor.login}
                </a>
                <span>{contributor.contributions} commits</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RepoDetails;
