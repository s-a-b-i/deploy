import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';  // Notice the '.js' extension is required in ES modules
import authRoutes from './routes/auth.routes.js';
import websiteRoutes from './routes/website.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import promoRoutes from './routes/promo.routes.js';
import profileRoutes from './routes/profile.routes.js';



dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();


app.use(cors({
  origin: 'http://localhost:5173', credentials: true,
}))

// Middlewares
app.use(express.json()); // For parsing JSON
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Routes
app.get("/" , (req, res) => {
  res.send("Hello World!");
})

app.use("/api/auth" , authRoutes)

app.use("/api/websites" , websiteRoutes)

app.use('/api/promos', promoRoutes);

app.use('/api', profileRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
