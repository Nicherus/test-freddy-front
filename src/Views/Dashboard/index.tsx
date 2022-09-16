import React, { useEffect, useState } from "react";
import api from "../../utils/apiConfig";
import { Box, Container, Typography, Card, Grid } from "@material-ui/core";
import AppDrawer from "../../Components/Drawer";
import { useStyles } from "./styles";
import { OrdersAndTotal, Seller } from "./types";
import refreshToken from "../../utils/refreshToken";

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const [bestSellers, setBestSellers] = useState<Seller[]>([]);
  const [salesOverTimeWeek, setSalesOverTimeWeek] = useState<OrdersAndTotal[]>(
    []
  );
  const [salesOverTimeYear, setSalesOverTimeYear] = useState<OrdersAndTotal[]>(
    []
  );
  const [lastWeekTotalValue, setLastWeekTotalValue] = useState(0);
  const [lastWeekTotalOrders, setLastWeekTotalOrders] = useState(0);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const newToken = await refreshToken();
      const { data } = await api.get("/dashboard", {
        headers: { Authorization: `Bearer ${newToken}` },
      });

      if (data) {
        setBestSellers(data.dashboard.bestsellers);
        setSalesOverTimeWeek(data.dashboard.sales_over_time_week);
        setSalesOverTimeYear(data.dashboard.sales_over_time_year);

        setLastWeekTotalValue(
          getLastWeekTotalValue(data.dashboard.sales_over_time_week)
        );

        setLastWeekTotalOrders(
          getLastWeekTotalOrders(data.dashboard.sales_over_time_week)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLastWeekTotalValue = (lastWeek: OrdersAndTotal[]): number => {
    let sumTotal = 0;

    for (let i = 1; i <= 7; i++) {
      sumTotal += lastWeek[i]?.total;
    }

    return sumTotal;
  };

  const getLastWeekTotalOrders = (lastWeek: OrdersAndTotal[]): number => {
    let sumTotal = 0;

    for (let i = 1; i <= 7; i++) {
      sumTotal += lastWeek[i]?.orders;
    }

    return sumTotal;
  };

  return (
    <Container>
      <AppDrawer />
      <Box component="main" className={classes.boxContent}>
        <Typography variant="h4" align="left" className={classes.title}>
          Dashboard
        </Typography>

        {salesOverTimeWeek && salesOverTimeYear ? (
          <Grid container className={classes.gridCards}>
            <Grid item>
              <Card variant="outlined" className={classes.card}>
                <Typography variant="body2">Today</Typography>
                <Typography align="center">
                  <>
                    ${salesOverTimeWeek[7]?.total} /{" "}
                    {salesOverTimeWeek[7]?.orders} orders
                  </>
                </Typography>
              </Card>
            </Grid>

            <Grid item>
              <Card variant="outlined" className={classes.card}>
                <Typography variant="body2">Last Week</Typography>
                <Typography align="center">
                  <>
                    ${lastWeekTotalValue} / {lastWeekTotalOrders} orders
                  </>
                </Typography>
              </Card>
            </Grid>

            <Grid item>
              <Card variant="outlined" className={classes.card}>
                <Typography variant="body2">Last Month</Typography>
                <Typography align="center">
                  <>
                    ${salesOverTimeYear[12]?.total} /{" "}
                    {salesOverTimeYear[12]?.orders} orders
                  </>
                </Typography>
              </Card>
            </Grid>
          </Grid>
        ) : null}

        <Typography variant="h4" align="left" className={classes.title}>
          Revenue (last 7 days)
        </Typography>

        <Typography variant="h4" align="left" className={classes.title}>
          Bestsellers
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;
