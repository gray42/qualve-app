import mongoose from "mongoose";

// Define a schema for a simple user
const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: false,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      min: 8
    },
    role: {
      type: String,
      enum: ['tutor', 'learner']
    },
    age: {
      type: Number,
      required: false
    },
    created_at: {
      type: Date,
      default: Date.now
    }
});
  
// Create a model from the schema
export const User = mongoose.model('users', UserSchema);
