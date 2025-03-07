const fs = require("fs");
const express = require("express");
const multer = require("multer");
const cors = require("cors"); // CORS 설정 추가
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

// CORS 허용
app.use(cors({
    origin: 'http://localhost:3000',  // 클라이언트 주소 설정
    methods: ['GET', 'POST'],         // 허용할 메서드 설정
    allowedHeaders: ['Content-Type'], // 허용할 헤더 설정
  }));

// 'uploads' 폴더를 정적 파일로 제공
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 이미지 업로드를 위한 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // 파일을 'uploads' 폴더에 저장
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);  // 파일 확장자 가져오기
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);  // 고유한 파일 이름 생성
        cb(null, uniqueSuffix + ext);  // 고유한 이름 + 확장자
    }
});

const upload = multer({
    storage: storage,  // storage 설정 사용
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        
        if (extname && mimetype) {
            return cb(null, true);  // 파일이 유효하면 업로드 허용
        } else {
            cb(new Error('Only jpeg, jpg, and png files are allowed'));
        }
    }
});

// MySQL 설정
const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

// 고객 목록 조회 (GET 요청)
app.get("/api/customers", (req, res) => {
    connection.query("SELECT * FROM customer WHERE isDeleted = 0", (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json(rows);
    });
});

// 고객 추가 (POST 요청)
app.post("/api/customers", upload.single('image'), (req, res) => {
    const { name, birthday, gender, job } = req.body;
    const image = req.file ? req.file.filename : null;

    // 업로드된 파일 경로 로그 출력
    console.log('Uploaded file path:', path.join(__dirname, 'uploads', image));

    // AUTO_INCREMENT 값을 5로 리셋
    const resetAutoIncrementQuery = "ALTER TABLE customer AUTO_INCREMENT = 5";

    connection.query(resetAutoIncrementQuery, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error resetting AUTO_INCREMENT' });
        }

        // 데이터 삽입 쿼리
        const query = "INSERT INTO customer (image, name, birthday, gender, job) VALUES (?, ?, ?, ?, ?,now(),0)";
        connection.query(query, [image, name, birthday, gender, job], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Database insertion error' });
            }

            // 성공적으로 데이터를 삽입하고 이미지 파일명을 반환
            res.status(200).json({ message: 'Customer added successfully', image: image });
        });
    });
});

app.delete("/api/customers/:id", (req, res) => {
    const sql = "DELETE FROM customer WHERE id = ?";
    const params = [req.params.id];

    connection.query(sql, params, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer deleted successfully' });
    });
});

// 서버 실행
app.listen(port, () => console.log(`Listening on port ${port}`));
