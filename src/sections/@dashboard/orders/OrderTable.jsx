import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";

import Label from "../../../components/label";
import Iconify from "../../../components/iconify";

function OrderTable({ orders, onStatusChange, onEditClick }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Order ID</TableCell>
            <TableCell align="center">Customer Name</TableCell>
            <TableCell align="center">Phone Number</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell align="center">{order.id}</TableCell>
              <TableCell align="center">{order.customerName}</TableCell>
              <TableCell align="center">{order.phoneNumber}</TableCell> {/* Add Phone Number column */}
              <TableCell align="center">{order.date}</TableCell>
              <TableCell align="center">
                <Label color={order.status === "Delivered" ? "success" : "warning"}>{order.status}</Label>
              </TableCell>
              <TableCell align="center">
                <IconButton onClick={() => onEditClick(order.id)}>
                  <Iconify icon="eva:edit-fill" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderTable;
