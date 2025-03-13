import { GITHUB_API_CONFIG } from "@/config/github";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

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

  try {
    const response = await fetch(
      `${GITHUB_API_CONFIG.BASE_URL}/repos/${username}/${repo}/contributors`,
      {
        headers: {
          ...GITHUB_API_CONFIG.HEADERS,
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return Response.json(
        { error: error.message },
        { status: response.status }
      );
    }

    const data = await response.json();

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
