import React from "react";
import { TableRow, TableCell } from "@mui/material";
import CustomerDelete from "./CustomerDelete";

function Customer(props) {
  return (
    <TableRow>
      <TableCell>{props.id}</TableCell>
      <TableCell>
        <img 
          src={props.image} 
          alt="profile" 
          style={{ width: 64, height: 64, objectFit: "cover", borderRadius: "50%" }} // ✅ 크기 고정 + 동그랗게
        />
      </TableCell>
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.birthday}</TableCell>
      <TableCell>{props.gender}</TableCell>
      <TableCell>{props.job}</TableCell>
      <TableCell><CustomerDelete stateRefresh={props.stateRefresh} id={props.id}/></TableCell>
    </TableRow>
  );
}

export default Customer;
