import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';

const app: Express = express();
const port = 5000

const uri = 'mongodb+srv://sroovy:dltndus1@boilerplate.shur2ov.mongodb.net/?retryWrites=true&w=majority';
  mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})