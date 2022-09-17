import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageContainer: {
      marginTop: 20,
      marginLeft: 240,
    },
    boxContent: {
      display: "flex",
      flexDirection: "column",
    },
    title: {
      marginBottom: "60px !important",
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
    revenueHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      maxWidth: 800,
    },
    chartContainer: {
      marginBottom: 50,
    },
  })
);
