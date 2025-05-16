const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const fs = require('fs');

const app = express();
const PORT = 3002;
const dbFilePath = './src/db_analys.json';

app.use(cors());
app.use(bodyParser.json());

// Đọc và ghi file JSON
function readDB() {
  const data = fs.readFileSync(dbFilePath, 'utf-8');
  return JSON.parse(data);
}

function writeDB(data) {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
}

// Đăng ký
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const db = readDB();

  const userExists = db.users.find(u => u.email === email);
  if (userExists) return res.status(400).json({ message: 'Email đã tồn tại!' });

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = { id: Date.now(), name, email, password: hashedPassword };

  db.users.push(newUser);
  writeDB(db);

  res.status(201).json({ message: 'Đăng ký thành công' });
});

// Đăng nhập
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDB();

  const user = db.users.find(u => u.email === email);
  if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng' });

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Sai mật khẩu' });

  res.status(200).json({ message: 'Đăng nhập thành công', user });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
