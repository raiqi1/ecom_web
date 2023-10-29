import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import styles from "./styles.module.scss";
import { RoomTwoTone, Rowing } from "@mui/icons-material";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row._id}
        </TableCell>
        <TableCell align="center">
          {row.paymentMethod === "paypal"
            ? "Paypal"
            : row.paymentMethod === "credit_card"
            ? "Credit Card"
            : "Cash On Delivery"}
        </TableCell>
        <TableCell align="center">
          {row.isPaid ? (
            <img
              src="../../../images/verified.png"
              alt=""
              className={styles.ver}
            />
          ) : (
            <img
              src="../../../images/unverified1.png"
              alt=""
              className={styles.ver}
            />
          )}
        </TableCell>
        <TableCell align="center">
          <span
            className={
              row.status === "Not Processing"
                ? styles.not_processed
                : row.status === "Processing"
                ? styles.processing
                : row.status === "Dispatched"
                ? styles.dispatched
                : row.status === "Cancelled"
                ? styles.cancelled
                : row.status === "Completed"
                ? styles.completed
                : ""
            }
          >
            {" "}
            {row.status}
          </span>
        </TableCell>
        <TableCell align="center">{row.couponAplied || "-"}</TableCell>
        <TableCell align="center">
          <b> {row.total}$</b>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order for
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead className={styles.head}>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Full Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell align="right">Shipping Information</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className={styles.body}>
                  <TableRow key={row.user._id}>
                    <TableCell component="th">
                      <img
                        src={row.user.image}
                        alt=""
                        className={styles.table__img}
                      />
                    </TableCell>
                    <TableCell align="center">{row.user.name}</TableCell>
                    <TableCell align="center">{row.user.email}</TableCell>
                    <TableCell align="right">
                      {row.shippingAddress.address1}
                      {row.shippingAddress.address2}
                      <br />
                      {row.shippingAddress.city}
                      <br />
                      {row.shippingAddress.country}
                      <br />
                      {row.shippingAddress.zipCode}
                      <br />
                      {row.shippingAddress.phoneNumber}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order items
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead className={styles.head}>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className={styles.body}>
                  {row.products.map((p) => (
                    <TableRow key={p._id}>
                      <TableCell component="th">
                        <img
                          src={p.image}
                          alt=""
                          className={styles.productImg}
                        />
                      </TableCell>
                      <TableCell align="center">{p.name}</TableCell>
                      <TableCell align="center">{p.size}</TableCell>
                      <TableCell align="center">x{p.qty}</TableCell>
                      <TableCell align="center">{p.price}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow key={row._id}>
                    <TableCell component="th"><b>SubTotal : </b></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"><b>{row.total}</b></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    order: PropTypes.number.isRequired,
    payment_method: PropTypes.string.isRequired,
    paid: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    coupon: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    user: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.number.isRequired,
        email: PropTypes.string.isRequired,
        shippingAddress: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function CollapsibleTable({ rows }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order</TableCell>
            <TableCell align="right">Payment Method</TableCell>
            <TableCell align="right">Paid</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Coupon</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
