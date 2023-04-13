import { Schema, model } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  lastname: string;
  role: number;
  avatar?: string;
  token: string;
  tokenExp: number;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0
  },
  avatar: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
})

const User = model<IUser>('User', userSchema);
export default User;