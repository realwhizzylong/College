import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import path from 'path';
import userRoutes from './routes/userRoutes.js';
import collegeRoutes from './routes/collegeRoutes.js';
import admissionRoutes from './routes/admissionRoutes.js';
import postRoutes from './routes/postRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);

app.use('/api/colleges', collegeRoutes);

app.use('/api/admissions', admissionRoutes);

app.use('/api/posts', postRoutes);

app.get('/api/config/mapboxToken', (req, res) => {
    res.send(process.env.MAPBOX_TOKEN)
});

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running...')
    });
}

app.use(notFound);

app.use(errorHandler);

const MODE = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(`Server running in ${MODE} mode on port ${PORT}`)
);