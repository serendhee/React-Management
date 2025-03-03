import React, { useState, useEffect } from "react";
import "./App.css";
import Customer from "./components/Customer";
import { Table, TableHead, TableBody, TableRow, TableCell, Box } from "@mui/material";

function App() {
  const [customers, setCustomers] = useState([]); // useState로 state 관리

  useEffect(() => {
    callApi()
      .then((res) => setCustomers(res))
      .catch((err) => console.log(err));
  }, []); // 빈 배열 -> 컴포넌트 마운트 시 한 번만 실행됨

  const callApi = async () => {
    const response = await fetch("/api/customers");
    const body = await response.json();
    return body;
  };

  return (
    <Box sx={{ padding: 2, boxShadow: 3 }}>
      <Box sx={{ width: "100%", marginTop: 3, overflowX: "auto" }}>
        <Table sx={{ minWidth: 1080 }}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.length > 0 ? (
              customers.map((c) => (
                <Customer
                  key={c.id}
                  id={c.id}
                  image={c.image}
                  name={c.name}
                  birthday={c.birthday}
                  gender={c.gender}
                  job={c.job}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  로딩 중...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}

export default App;
