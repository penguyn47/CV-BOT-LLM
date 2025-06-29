const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const aiRoutes = require('./routes/aiRoutes');


const app = express();
const port = process.env.PORT || 3000;

// Cấu hình CORS để chấp nhận yêu cầu từ FE (port 5173)
app.use(cors({
    origin: 'http://localhost:5173' // Địa chỉ FE
}));
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api/ai', aiRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});