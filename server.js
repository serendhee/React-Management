const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/api/customers",(req,res) => {
    res.send([
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
    ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));