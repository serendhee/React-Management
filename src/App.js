import React from 'react';
import './App.css';
import Customer from './components/Customer';

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
        name: '박민수',
        birthday: '941004',
        gender: '남자',
        job: '개발자',
    },
];

function App() {
    return (
        <div>
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
        </div>
    );
}

export default App;
