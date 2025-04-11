import express from 'express';
import cors from 'cors';
import bookRoutes from './routes/book.routes';
import authorRoutes from './routes/author.routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);

export default app;
