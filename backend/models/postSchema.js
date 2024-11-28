import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    author: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: false
    },
    body: {
      type: String,
      required: false
    },
    votes: {
      type: Number,
      default: 0
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    },
    created_at: {
      type: Date,
      default: Date.now
    }
});

// Define a schema for a simple user
const questionSchema = new mongoose.Schema({
    author: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true
    },  
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: false
    },
    tags: {
      type: [String],
      required: false,
      default: []
    },
    votes: {
      type: Number,
      default: 0
    },
    numAnswers: {
      type: Number,
      default: 0
    },
    answers: [answerSchema],
    views: {
      type: Number,
      default: 0
    },
    created_at: {
      type: Date,
      default: Date.now
    }
}, 
{ timestamps: true });
  
// Create a model from the schema
export const Post = mongoose.model('Post', questionSchema);
  