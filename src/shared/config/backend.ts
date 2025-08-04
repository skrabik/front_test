export const backendBaseUrl =
  import.meta.env.VITE_API_BASE_URL ||
  (location.href.includes('production')
    ? 'http://localhost:4000'
    : 'http://localhost:4000');

export const errorPercentage = import.meta.env.VITE_ERROR_PERCENTAGE || 10;
