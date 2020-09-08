let token: string = "";

export const getToken = (): string => {
  return token;
};
export const setToken = (newToken: string): string => {
  token = newToken;
  return token;
};
