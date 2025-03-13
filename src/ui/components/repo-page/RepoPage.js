"use client";
import RepoDetails from "./RepoDetails";
import ContribDetails from "./ContribDetails";
const RepoPage = ({ repoData, contribsData }) => {
  return (
    <>
      <RepoDetails repoData={repoData} />
      <ContribDetails contribsData={contribsData} />
    </>
  );
};
export default RepoPage;
