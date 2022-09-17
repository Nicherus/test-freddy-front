import { CircularProgress, Box } from "@material-ui/core";
import { useStyles } from "./styles";

export default function LoadingSpinner() {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <CircularProgress />
    </Box>
  );
}
