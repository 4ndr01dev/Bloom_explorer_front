// export const fetchService = async <T>(
export const fetchService = async (
  baseUrl: string,
queryParams: Record<string, string | number>| undefined = {},
  options: RequestInit = {},
  // ): Promise<T> => {
) => {
  const apiUrl = process.env.REACT_APP_DEV_API_URL;
  const url = new URL(baseUrl, apiUrl);
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });

    try {
      const response = await fetch(url.toString(), options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json() ;
    } catch (error) {
      throw new Error(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};
