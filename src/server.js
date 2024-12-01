import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import connectDB from "./config/connectDB";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Cấu hình view engine
configViewEngine(app);

// Khởi tạo các route
initWebRoutes(app);

//Test connect db
connectDB();

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});