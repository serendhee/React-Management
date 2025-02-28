import React from 'react';
import './App.css';
import Customer from './components/Customer';
import { Table,TableHead,TableBody,TableRow,TableCell,Box} from '@mui/material';

const customers = [
    {
        id: 1,
        image: 'https://picsum.photos/64/64',
        name: '홍길동',
        birthday: '990309',
        gender: '남자',
        job: '대학생',
    },
    {
        id: 2,
        image: 'https://picsum.photos/64/64',
        name: '김성민',
        birthday: '910102',
        gender: '남자',
        job: '프로그래머',
    },
    {
        id: 3,
        image: 'https://picsum.photos/64/64',
        name: '박민규',
        birthday: '941004',
        gender: '남자',
        job: '개발자',
    },
];

function App() {
    return (
        <Box sx={{ padding: 2, boxShadow: 3 }}>
          <Box sx={{width:"100%", marginTop: 3, overflowX: 'auto'}}>
          <Table sx={{minWidth:1080}}>

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
          {
            customers.map(c => {
              return (
                <Customer
                  key={c.id}
                  id={c.id}
                  image={c.image}
                  name={c.name}
                  birthday={c.birthday}
                  gender={c.gender}
                  job={c.job}
                  />
              )
            })
          }
          </TableBody>

          </Table>
          </Box>
        </Box>
    );
}

export default App;
