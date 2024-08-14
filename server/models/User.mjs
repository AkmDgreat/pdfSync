import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  picture: { type: String },
}, { timestamps: true });

const User = model('User', userSchema);

export default User;