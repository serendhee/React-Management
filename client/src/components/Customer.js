import React from "react";
import { TableRow, TableCell } from "@mui/material";

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
    </TableRow>
  );
}

export default Customer;
