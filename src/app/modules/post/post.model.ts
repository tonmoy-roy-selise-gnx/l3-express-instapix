import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface IPost {
  userId: string;
  content: string;
  comment: [{
    userId: string;
    comment: string;
  }];
  likedBy: string[];
  likes: number;
  files: Array<string>;
  userName: string;
  userEmail: string;
}
// 2. Create a Schema corresponding to the document interface.
const postSchema = new Schema<IPost>(
  {
    userId: {
      type: String,
      // type: Schema.Types.ObjectId,
      // ref: "InstUser",
    },
    files: {
      type: [String],
    },
    content: {
      type: String,
    },
    comment: {
      type: [{
        userId: String,
        comment: String,
      }], // Use an array of strings
    },
    likedBy: {
      type: [String],
    },
    likes: {
      type: Number,
      default: 0,
    },
    userName: {
      type: String,
    },
    userEmail: {
      type: String,
    },
  },
  { minimize: false, timestamps: true,collection: 'InstaPosts' }
);
/*
  minimize option is used within a schema to control whether 
  empty objects (objects with no properties) should be saved in the MongoDB documents or not. 
  When minimize is set to false, Mongoose will store empty objects in the documents, 
  while setting it to true (which is the default) will remove empty objects when saving.

  collection: 
    collection name as same as that

*/

// 3. Create a Model.
const InstaPost = model<IPost>("InstaPost", postSchema);

export default InstaPost;

