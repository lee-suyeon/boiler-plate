import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
const saltRounds = 10;

export interface IUser {
  name: string;
  email: string;
  password: string;
  lastname: string;
  role: number;
  avatar?: string;
  token: string;
  tokenExp: number;
  comparePassword: (
    plainPassword: string,
    callback: (err: any, isMatch: boolean) => void
  ) => void;
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
    unique: 1
  },
  password: {
    type: String,
    required: true,
    maxlength: 15
  },
  lastname: {
    type: String,
    maxlength: 50
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
});

// save 하기전에 실행할 함수
userSchema.pre('save', function (next) {
  const user = this;

  // 비밀번호를 변경할때만 암호화
  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (
  plainPassword: string,
  callback: (err: any, isMatch?: boolean) => {}
) {
  // plainPassword를 암호화 해서 db에 저장된 암호화된 비밀번호랑 비교
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

const User = model<IUser>('User', userSchema);
export default User;
