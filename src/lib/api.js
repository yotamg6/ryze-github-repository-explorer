import { BASE_URL } from "@/config/general";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
import { GITHUB_API_CONFIG } from "@/config/github";

export const fetchReposData = async (owner, page = 1, perPage = 3) => {
  // TODO: should call github's api directly
  const response = await fetch(
    `${BASE_URL}/api/github/repos?username=${owner}&page=${page}&per_page=${perPage}`,
    {
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch repos data");
  }
  return response.json();
};

export const fetchOneRepoData = async (owner, name) => {
  try {
    const response = await fetch(
      `${GITHUB_API_CONFIG.BASE_URL}/repos/${owner}/${name}`,
      {
        headers: {
          ...GITHUB_API_CONFIG.HEADERS,
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch repo data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchContributors = async (owner, name) => {
  // TODO: should call github's api directly
  const response = await fetch(
    `${BASE_URL}/api/github/contributors?username=${owner}&repo=${name}`,
    {
      cache: "force-cache",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch contributors");
  }
  return response.json();
};
