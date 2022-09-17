import React, { useEffect, useState } from "react";
import api from "../../utils/apiConfig";
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  TextField,
  TablePagination,
} from "@material-ui/core";
import LoadingSpinner from "../../Components/LoadingSpinner";
import AppDrawer from "../../Components/Drawer";
import refreshToken from "../../utils/refreshToken";
import { useStyles } from "./styles";
import { Order } from "./types";

const Orders: React.FC = () => {
  const classes = useStyles();
  const [tableData, setTableData] = useState<Order[]>([]);
  const [searchTerms, setSearchTerms] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    fetchData();
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const newToken = await refreshToken();
      const { data } = await api.get(
        `/orders?page=${currentPage + 1}&q=${searchTerms}`,
        {
          headers: { Authorization: `Bearer ${newToken}` },
        }
      );
      setLoading(false);

      if (data) {
        setTableData(data.orders);
        setTotalItems(data.total);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Container className={classes.pageContainer}>
      <AppDrawer />
      <Box component="main" className={classes.boxContent}>
        <Grid container className={classes.pageHeader}>
          <Typography variant="h4" align="left" className={classes.title}>
            Orders
          </Typography>

          <form noValidate onSubmit={handleSearch}>
            <TextField
              id="search"
              label="Search"
              placeholder="enter your query search"
              onChange={(e) => setSearchTerms(e.target.value)}
            />
          </form>
        </Grid>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.product.name}
                      </TableCell>
                      <TableCell align="right">{row.created_at}</TableCell>
                      <TableCell align="right">
                        {row.currency + row.total}
                      </TableCell>
                      <TableCell align="right" color="">
                        <Typography
                          color={
                            row.status === "processing"
                              ? "error"
                              : row.status === "delivered"
                              ? "textSecondary"
                              : "inherit"
                          }
                        >
                          {row.status}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component={"div"}
              rowsPerPage={50}
              rowsPerPageOptions={[50]}
              count={totalItems}
              page={currentPage}
              onPageChange={handleChangePage}
            />
          </>
        )}
      </Box>
    </Container>
  );
};

export default Orders;
