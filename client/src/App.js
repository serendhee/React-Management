import React, { useState, useEffect } from "react";
import "./App.css";
import CustomerAdd from "./components/CustomerAdd";
import Customer from "./components/Customer";
import { Table, TableHead, TableBody, TableRow, TableCell, Box, CircularProgress } from "@mui/material";

function App() {
  const [customers, setCustomers] = useState([]);  // 고객 목록 상태
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetchCustomers();  // 컴포넌트가 처음 렌더링될 때 고객 데이터 로드
  }, []);

  // API에서 고객 목록을 가져오는 함수
  const fetchCustomers = async () => {
    const response = await fetch("/api/customers");
    const data = await response.json();
    const updatedCustomers = data.map((customer) => ({
      ...customer,
      imageUrl: customer.image.startsWith("http") ? customer.image : `http://localhost:5000/uploads/${customer.image}`,
    }));
    setCustomers(updatedCustomers);  // 상태 갱신
    setLoading(false);
  };

  // 고객 목록을 갱신하는 함수 (자식 컴포넌트에서 호출됨)
  const addCustomerToList = (newCustomer) => {
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
  };

  return (
    <div>
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
                <TableCell>설정</TableCell>
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
                    stateRefresh={fetchCustomers}
                    key={c.id}
                    id={c.id}
                    image={c.imageUrl}  // 🔥 URL 또는 로컬 경로
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
      <CustomerAdd addCustomerToList={addCustomerToList} fetchCustomers={fetchCustomers} />

    </div>
  );
}

export default App;
