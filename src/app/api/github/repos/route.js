import { GITHUB_API_CONFIG } from '@/config/github';
import { cacheData, getCachedData } from '@/lib/cache';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return Response.json({ error: 'Username is required' }, { status: 400 });
  }

  const cacheKey = `repos-${username}`;
  const cachedData = getCachedData(cacheKey);
  
  if (cachedData) {
    return Response.json(cachedData);
  }

  try {
    const response = await fetch(`${GITHUB_API_CONFIG.BASE_URL}/users/${username}/repos`, {
      headers: GITHUB_API_CONFIG.HEADERS
    });
    
    if (!response.ok) {
      const error = await response.json();
      return Response.json({ error: error.message }, { status: response.status });
    }
    
    const data = await response.json();
    cacheData(cacheKey, data);
    
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}