import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import initWebRoutes from './routes/web';
import configViewEngine from './config/viewEngine';
import 'dotenv/config';


const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configViewEngine(app);
initWebRoutes(app);

// Simple route
app.get('/', (req, res) => {
    res.send("Welcome to BookingCare API");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});