import { Schema, model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
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
  password: {
    type: String,
    required: true,
    maxlength: 15,
  },
  lastname: {
    type: String,
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