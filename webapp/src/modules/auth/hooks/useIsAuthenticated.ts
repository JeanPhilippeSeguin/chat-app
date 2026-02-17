export const useIsAuthenticated = (): boolean => {
  return document.cookie.includes("isAuthenticated");
};
