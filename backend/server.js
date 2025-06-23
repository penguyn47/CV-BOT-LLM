const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Cấu hình CORS để chấp nhận yêu cầu từ FE (port 5173)
app.use(cors({
    origin: 'http://localhost:5173' // Địa chỉ FE
}));
app.use(express.json());
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});