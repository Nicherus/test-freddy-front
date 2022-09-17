import React, { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import api from "../../utils/apiConfig";
import { State, Action } from "./types";
import { Logo, useStyles } from "./styles";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setUsername":
      return {
        ...state,
        username: action.payload,
      };
    case "setPassword":
      return {
        ...state,
        password: action.payload,
      };
    case "setIsButtonDisabled":
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
    case "loginSuccess":
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isError: false,
      };
    case "loginFailed":
      return {
        ...state,
        text: action.payload,
        isError: true,
      };
    case "setIsError":
      return {
        ...state,
        isError: action.payload,
      };
  }
};

const initialState: State = {
  username: "",
  password: "",
  isButtonDisabled: true,
  text: "",
  isError: false,
  accessToken: "",
  refreshToken: "",
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.username && state.password) {
      dispatch({
        type: "setIsButtonDisabled",
        payload: false,
      });
    } else {
      dispatch({
        type: "setIsButtonDisabled",
        payload: true,
      });
    }
  }, [state.username, state.password]);

  useEffect(() => {
    if (state.refreshToken || state.accessToken) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.refreshToken, state.accessToken]);

  const handleSubmitLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const body = {
      username: state.username,
      password: state.password,
    };

    try {
      const { data } = await api.post("/login", body);

      if (data) {
        dispatch({
          type: "loginSuccess",
          payload: {
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
          },
        });

        localStorage.setItem("token", data.access_token);
        localStorage.setItem("refresh", data.refresh_token);

        navigate("/");
      }
    } catch (error) {
      dispatch({
        type: "loginFailed",
        payload: "Incorrect username or password",
      });
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setUsername",
      payload: event.target.value,
    });
  };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setPassword",
      payload: event.target.value,
    });
  };

  return (
    <form className={classes.container} noValidate onSubmit={handleSubmitLogin}>
      <Card className={classes.card}>
        <CardContent className={classes.header}>
          <div>
            Freddy's
            <br />
            Artisanal
            <br />
            Halloween
            <br />
            Candy Shop
          </div>
          <Logo alt={"logo"} src={process.env.PUBLIC_URL + "./logo.svg"} />
        </CardContent>
        <CardContent>
          <Grid container className={classes.inputBox}>
            <TextField
              error={state.isError}
              fullWidth
              id="username"
              label="Username"
              placeholder="enter your username"
              onChange={handleUsernameChange}
            />
            <TextField
              error={state.isError}
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="enter your password"
              helperText={state.text}
              onChange={handlePasswordChange}
            />
          </Grid>

          <CardActions>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              color="default"
              type="submit"
              className={classes.loginButton}
              disabled={state.isButtonDisabled}
            >
              Login
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </form>
  );
};

export default Login;
