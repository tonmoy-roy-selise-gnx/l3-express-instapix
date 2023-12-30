import { Schema, model } from "mongoose";

export interface IFollowers {
  name: String;
  id: Schema.Types.ObjectId;
}

export interface IFollowing extends IFollowers { };

export interface IUser {
  userId: string;
  userEmail: string;
  userPassword: string;
  userPhone: string;
  userName: string;
  followers: any; //followers:Array<object>, Array<Schema.Types.ObjectId>;
  following: any; //following:Array<object>, Schema.Types.ObjectId;
  avatar: string;
}

const instaUserSchema = new Schema<IUser>(
  {
    userId: { type: String, required: true, default: "" },
    userEmail: {
      type: String,
    },
    userPassword: {
      type: String,
    },
    userName: {
      type: String,
    },
    followers: [
      {
        type: String,
      },
    ],
    following: [
      {
        type: String,
      },
    ],
    avatar: {
      type: String,
    },
  },
  { minimize: false, timestamps: true, collection: 'InstUsers' }
);
//minimize option is used within a schema to control whether empty objects (objects with no properties) should be saved in the MongoDB documents or not. When minimize is set to false, Mongoose will store empty objects in the documents, while setting it to true (which is the default) will remove empty objects when saving.

// 3. Create a Model.
const InstaUser = model<IUser>("InstUser", instaUserSchema);

export default InstaUser;
