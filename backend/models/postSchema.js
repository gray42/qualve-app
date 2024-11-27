import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'users', 
      required: false
    },
    answer: {
      type: String,
      required: false
    },
    created_at: {
      type: Date,
      default: Date.now
    }
});

// Define a schema for a simple user
const questionSchema = new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'users', 
      required: false
    },  
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    tags: {
      type: [String],
      required: false,
      default: []
    },
    upVotes: {
      type: Number,
      default: 0
    },
    numAnswers: {
      type: Number,
      default: 0
    },
    views: {
      type: Number,
      default: 0
    },
    created_at: {
      type: Date,
      default: Date.now
    },

    answers: [answerSchema],

}, { timestamps: true });
  
// Create a model from the schema
export const Post = mongoose.model('questions', questionSchema);
  