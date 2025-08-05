export const backendBaseUrl =
  import.meta.env.VITE_API_BASE_URL ||
  (location.href.includes('production')
    ? 'http://103.228.168.81:4000'
    : 'http://103.228.168.81:4000');

export const errorPercentage = import.meta.env.VITE_ERROR_PERCENTAGE || 10;
