import { GITHUB_API_CONFIG } from "@/config/github";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") || "3", 10);

  if (!username) {
    return Response.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `${GITHUB_API_CONFIG.BASE_URL}/users/${username}/repos?page=${page}&per_page=${perPage}`,
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
