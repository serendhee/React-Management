import React, { useState, useEffect } from "react";
import "./App.css";
import Customer from "./components/Customer";
import { Table, TableHead, TableBody, TableRow, TableCell, Box,CircularProgress } from "@mui/material";


function App() {

  // 1) constructor()
  const [customers, setCustomers] = useState([]); // useState로 state 관리
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  // 2) componentWilMount()
  useEffect(() => {
    callApi()
      .then((res) => {
        setCustomers(res);
        setLoading(false); // 데이터 로드 완료 시 로딩 상태 false로 변경
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // 오류가 발생하면 로딩 상태를 false로 변경
      });
  }, []); // 4) componentDidMount()

  const callApi = async () => {
    const response = await fetch("/api/customers");
    const body = await response.json();
    return body;
  };

  // 3) render()
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
          {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress sx={{ margin: "auto" }} />
                </TableCell>
              </TableRow>
            ) : (
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
            )}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}

export default App;
