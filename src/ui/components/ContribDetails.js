import styles from "./repo-page.module.scss";
const ContribDetails = ({ contribsData }) => {
  return (
    <div className={styles.contributors}>
      <h2>Top Contributors</h2>
      <div className={styles.contributorsList}>
        {contribsData.map((contributor) => (
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
  );
};
export default ContribDetails;
