import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    boxContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
      justifyContent: "space-evenly",
      padding: 25,
    },
    title: {
      marginBottom: 50,
    },
    gridCards: {
      marginBottom: 50,
    },
    card: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 10,
      marginRight: 35,
      width: 200,
      height: 50,
    },
  })
);
