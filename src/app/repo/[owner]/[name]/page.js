import { Suspense } from "react";
import RepoDataWrapper from "@/ui/components/RepoDataWrapper";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const { fetchOneRepoData, fetchContributors } = require("@/lib/api");

const Loading = () => <div>Loading repository details...</div>;

const Repo = async ({ params }) => {
  const { owner, name } = await params;

  const repoDataPromise = fetchOneRepoData(owner, name);
  const contribsDataPromise = fetchContributors(owner, name);

  return (
    <Suspense fallback={<Loading />}>
      <RepoDataWrapper
        repoDataPromise={repoDataPromise}
        contribsDataPromise={contribsDataPromise}
      />
    </Suspense>
  );
};
export default Repo;
