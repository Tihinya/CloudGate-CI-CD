import express from 'express';
import allMoviesRoutes from './routes/movies.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
const PORT = process.env.INVENTORY_APP_PORT || 8080;

app.use(bodyParser.json());
app.use('/api/movies', allMoviesRoutes);

app.get('/', (req, res) => res.send('Hello, you are running the inventory-app now!'));

// start server
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
