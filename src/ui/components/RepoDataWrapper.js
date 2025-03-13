import RepoPage from "@/ui/components/repo-page/RepoPage";
import { use } from "react";

const RepoDataWrapper = ({ repoDataPromise, contribsDataPromise }) => {
  const repoData = use(repoDataPromise);
  const contribsData = use(contribsDataPromise);

  return <RepoPage repoData={repoData} contribsData={contribsData} />;
};

export default RepoDataWrapper;
