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
    pageHeader: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);
