export interface ITokenStore {
  token: string;
  setToken: (token: string) => void;
}
