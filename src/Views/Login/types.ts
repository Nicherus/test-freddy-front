export type State = {
  username: string;
  password: string;
  isButtonDisabled: boolean;
  text: string;
  isError: boolean;
  accessToken: string | null;
  refreshToken: string | null;
};

export type Action =
  | { type: "setUsername"; payload: string }
  | { type: "setPassword"; payload: string }
  | { type: "setIsButtonDisabled"; payload: boolean }
  | {
      type: "loginSuccess";
      payload: {
        accessToken: string;
        refreshToken: string;
      };
    }
  | { type: "loginFailed"; payload: string }
  | { type: "setIsError"; payload: boolean };
