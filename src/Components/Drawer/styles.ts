import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import styled from "styled-components";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: 240,
      "& .MuiDrawer-paper": {
        width: 240,
        padding: 40,
        boxSizing: "border-box",
      },
      "& .MuiDrawer-paperAnchorDockedLeft": {
        borderRight: "2px solid #A7A7A7",
      },
    },
  })
);

export const Logo = styled.img`
  height: 125px;
`;
