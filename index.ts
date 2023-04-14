import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import User, { IUser} from './models/User';
import bodyParser from 'body-parser';

const app: Express = express();
const port = 5000

/**
 * bodyparser option 설정
 * 1. application/x-www-form-urlencoded 분석
 * 2. application/json 분석
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.post('/register', async(req: Request, res: Response) => {
  
  // user model 생성
  const user = new User(req.body);
  
  try {
    // 회원가입 시 필요한 정보들을 client에서 가져오면 db에 저장한다.
    const userInfo = await user.save();
    res.status(201).json({
      success: true,
      userInfo
    });
  } catch(err) {
    res.json({ success: false, err });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})