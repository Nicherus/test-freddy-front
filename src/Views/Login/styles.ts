import styled from "styled-components";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      marginTop: 100,
    },
    loginButton: {
      textTransform: "none",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    card: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",

      maxWidth: 300,
      padding: 25,

      border: "5px #979797",
      borderStyle: "solid",

      fontSize: 25,
      fontFamily: "Roboto",
    },
    inputBox: {
      marginBottom: 50,
    },
  })
);

export const Logo = styled.img`
  height: 125px;
`;
