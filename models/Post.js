//Import mongoose mongoose
const mongoose = require('mongoose');
//Create a POST model (schema)
const PostSchema = new mongoose.Schema({
  //Link to another schema
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  text: { type: String, required: true },
  name: { type: String, required: true },
  avatar: { type: String },
  likes: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' } }],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
      text: { type: String, required: true },
      name: { type: String, required: true },
      avatar: { type: String },
      date: { type: Date, default: Date.now },
    },
  ],
  date: { type: Date, default: Date.now },
});
module.exports = Post = mongoose.model('post', PostSchema);
