import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis } from "recharts";
import api from "../../utils/apiConfig";
import {
  Box,
  Container,
  Typography,
  Card,
  Grid,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import LoadingSpinner from "../../Components/LoadingSpinner";
import AppDrawer from "../../Components/Drawer";
import { useStyles } from "./styles";
import { OrdersAndTotal, OrdersAndTotalChart, Seller } from "./types";
import refreshToken from "../../utils/refreshToken";
import kFormatter from "../../utils/kFormatter";

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const [bestSellers, setBestSellers] = useState<Seller[]>([]);
  const [salesOverTimeWeek, setSalesOverTimeWeek] = useState<OrdersAndTotal[]>(
    []
  );
  const [salesWeekChartData, setSalesWeekChartData] = useState<
    OrdersAndTotalChart[]
  >([]);
  const [salesOverTimeYear, setSalesOverTimeYear] = useState<OrdersAndTotal[]>(
    []
  );
  const [salesYearChartData, setSalesYearChartData] = useState<
    OrdersAndTotalChart[]
  >([]);
  const [lastWeekTotalValue, setLastWeekTotalValue] = useState(0);
  const [lastWeekTotalOrders, setLastWeekTotalOrders] = useState(0);
  const [revenueToggle, setRevenueToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const newToken = await refreshToken();
      const { data } = await api.get("/dashboard", {
        headers: { Authorization: `Bearer ${newToken}` },
      });
      setLoading(false);

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

        setSalesWeekChartData(
          getSalesWeekChartData(data.dashboard.sales_over_time_week)
        );

        setSalesYearChartData(
          getSalesYearChartData(data.dashboard.sales_over_time_year)
        );
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleRevenueToggle = () => {
    setRevenueToggle((old) => !old);
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

  const getSalesWeekChartData = (
    lastWeek: OrdersAndTotal[]
  ): OrdersAndTotalChart[] => {
    const chartData: OrdersAndTotalChart[] = [];

    chartData.push({
      name: "today",
      value: lastWeek[1]?.total,
    });

    chartData.push({
      name: "yesterday",
      value: lastWeek[2]?.total,
    });

    for (let i = 3; i <= 7; i++) {
      chartData.push({
        name: `day ${i}`,
        value: lastWeek[i]?.total,
      });
    }

    return chartData;
  };

  const getSalesYearChartData = (
    lastYear: OrdersAndTotal[]
  ): OrdersAndTotalChart[] => {
    const chartData: OrdersAndTotalChart[] = [];
    chartData.push({
      name: "this month",
      value: lastYear[1]?.total,
    });

    chartData.push({
      name: "last month",
      value: lastYear[2]?.total,
    });

    for (let i = 3; i <= 12; i++) {
      chartData.push({
        name: `month ${i}`,
        value: lastYear[i]?.total,
      });
    }

    return chartData;
  };

  return (
    <Container className={classes.pageContainer}>
      <AppDrawer />
      <Box component="main" className={classes.boxContent}>
        <Typography variant="h4" align="left" className={classes.title}>
          Dashboard
        </Typography>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Grid container className={classes.gridCards}>
              <Grid item>
                <Card variant="outlined" className={classes.card}>
                  <Typography variant="body2">Today</Typography>
                  <Typography align="center">
                    <>
                      ${kFormatter(salesOverTimeWeek[1]?.total)} /{" "}
                      {salesOverTimeWeek[1]?.orders} orders
                    </>
                  </Typography>
                </Card>
              </Grid>

              <Grid item>
                <Card variant="outlined" className={classes.card}>
                  <Typography variant="body2">Last Week</Typography>
                  <Typography align="center">
                    <>
                      ${kFormatter(lastWeekTotalValue)} / {lastWeekTotalOrders}{" "}
                      orders
                    </>
                  </Typography>
                </Card>
              </Grid>

              <Grid item>
                <Card variant="outlined" className={classes.card}>
                  <Typography variant="body2">Last Month</Typography>
                  <Typography align="center">
                    <>
                      ${kFormatter(salesOverTimeYear[12]?.total)} /{" "}
                      {salesOverTimeYear[12]?.orders} orders
                    </>
                  </Typography>
                </Card>
              </Grid>
            </Grid>

            <Grid container className={classes.revenueHeader}>
              <Typography variant="h4" align="left">
                Revenue (last {revenueToggle ? "12 months" : "7 days"})
              </Typography>
              <Switch
                checked={revenueToggle}
                onChange={handleRevenueToggle}
                color={"primary"}
                inputProps={{ "aria-label": "controlled" }}
              />
            </Grid>

            <Grid container className={classes.chartContainer}>
              <BarChart
                width={800}
                height={300}
                margin={{ bottom: 35 }}
                data={revenueToggle ? salesYearChartData : salesWeekChartData}
              >
                <XAxis
                  dataKey="name"
                  interval={0}
                  tickLine={false}
                  angle={-40}
                  tickMargin={20}
                />
                <Bar dataKey="value" fill="#C1C1C1" />
              </BarChart>
            </Grid>

            <Typography variant="h4" align="left" className={classes.title}>
              Bestsellers
            </Typography>

            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right"># Units Sold</TableCell>
                    <TableCell align="right">Revenue</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bestSellers.map((row) => (
                    <TableRow key={row.product.name}>
                      <TableCell component="th" scope="row">
                        {row.product.name}
                      </TableCell>
                      <TableCell align="right">
                        {row.revenue / row.units}
                      </TableCell>
                      <TableCell align="right">{row.units}</TableCell>
                      <TableCell align="right">{row.revenue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;
