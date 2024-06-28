import express from 'express';
import allMoviesRoutes from './app/routes/movies.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT

app.use(bodyParser.json());
app.use('/api/movies', allMoviesRoutes);

app.get('/', (req, res) => res.send('Hello, you are running the inventory-app now!'));

// start server
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
