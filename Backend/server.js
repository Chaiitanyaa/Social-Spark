import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/dbConfig.js';
import authRoutes from './src/routes/authRoutes.js';
import influencerRoutes from './src/routes/influencerRoutes.js';
import cors from 'cors';


dotenv.config({ path: './process.env' });
console.log("Mongo URI:", process.env.MONGO_URI);
connectDB();

const app = express();
// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/influencers', influencerRoutes);

// Health Check Route
app.get('/', (req, res) => {
    res.send('Influencer Finder API is running...');
});
app.use(cors({
    origin: '*', // Allows requests from any domain/IP
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));


const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
