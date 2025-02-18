import { GITHUB_API_CONFIG } from "@/config/github";
import { cacheData, getCachedData } from "@/lib/cache";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const repo = searchParams.get("repo");

  if (!username || !repo) {
    return Response.json(
      { error: "Username and repo are required" },
      { status: 400 }
    );
  }

  const cacheKey = `contributors-${username}-${repo}`;
  const cachedData = getCachedData(cacheKey);

  if (cachedData) {
    return Response.json(cachedData);
  }

  try {
    const response = await fetch(
      `${GITHUB_API_CONFIG.BASE_URL}/repos/${username}/${repo}/contributors`,
      { headers: GITHUB_API_CONFIG.HEADERS }
    );

    if (!response.ok) {
      const error = await response.json();
      return Response.json(
        { error: error.message },
        { status: response.status }
      );
    }

    const data = await response.json();
    cacheData(cacheKey, data);

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
